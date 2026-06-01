import OpenAI from 'openai';
import { montarContextoDoCodigo } from './codeContextService.js';
import { AppError } from '../utils/AppError.js';

const model = process.env.OPENAI_MODEL || 'gpt-5.5';
const maxOutputTokens = Number(process.env.OPENAI_MAX_OUTPUT_TOKENS || 900);
const permitirFallbackLocal = process.env.OPENAI_ALLOW_LOCAL_FALLBACK === 'true';

const instructions = [
  'Voce e a IA da Central de Ajuda do AssistTech, um sistema web para abertura e gerenciamento de chamados de suporte tecnico.',
  'Responda em portugues do Brasil, com linguagem direta, pratica e adequada para estudantes/desenvolvedores mantendo o projeto.',
  'Atue como tira-duvidas real do projeto: responda sobre uso do sistema, dados atuais da tela, chamados, usuarios, tecnicos, fluxo de atendimento, rotas, telas e manutencao do codigo.',
  'Classifique a intencao antes de responder: perguntas com "quantos", "quais", "nomes", "lista", "temos", "estao", "quem atende" ou "qual chamado" devem usar os dados operacionais; perguntas com "codigo", "arquivo", "rota", "service", "controller", "factory", "state", "API" ou "como foi implementado" devem explicar a parte tecnica.',
  'Use o contexto do codigo e o contexto operacional enviados pelo servidor. Se uma informacao nao aparecer nesses contextos, diga que nao foi possivel confirmar e indique onde verificar.',
  'Quando a pergunta for sobre numeros atuais, status, nomes, setores ou tecnicos, use o contexto operacional antes do codigo.',
  'Quando citar arquivos, use caminhos reais do repositorio. Quando explicar comandos, separe front-end e back-end.',
  'Nao responda como estudio de campanha ou marketing. Nao invente credenciais e nunca revele chaves de API.',
  'A chave OPENAI_API_KEY fica apenas no back-end; o front-end deve chamar somente a rota /api/assistente/perguntar.',
].join(' ');

const respostasLocais = [
  {
    termos: ['rodar', 'rodo', 'front', 'back', 'executar', 'localhost'],
    resposta: [
      'Para rodar o AssistTech em desenvolvimento:',
      '',
      '1. Back-end: entre em `back-end`, rode `npm install` e depois `npm run dev`. A API sobe em `http://localhost:8080/api`.',
      '2. Front-end: entre em `front-end`, rode `npm install` e depois `npm run dev`. O Vite normalmente sobe em `http://localhost:5173`.',
      '3. A tela usa `front-end/src/services/api.js`, que aponta para `http://localhost:8080/api`.',
      '',
      'A chave da OpenAI fica no arquivo `back-end/.env`, nunca no front-end.',
    ].join('\n'),
  },
  {
    termos: ['factory', 'method', 'categoria', 'criacao', 'criação'],
    resposta: [
      'O Factory Method aparece na criacao de chamados.',
      '',
      '`back-end/src/factories/chamados/ChamadoFactory.js` escolhe o creator conforme `dados.categoria`: `Hardware`, `Software`, `Rede` ou `Acesso`.',
      'Cada creator, como `HardwareChamadoCreator.js` e `RedeChamadoCreator.js`, define valores padrao da categoria, como prioridade e tecnico.',
      'O service `back-end/src/services/chamadoService.js` valida os dados e chama `ChamadoFactory.criar(dados, chamadoRepository.nextId())`.',
    ].join('\n'),
  },
  {
    termos: ['state', 'status', 'transicao', 'transição', 'avancar', 'avançar'],
    resposta: [
      'O padrao State controla a troca de status dos chamados.',
      '',
      'O fluxo fica em `back-end/src/states/chamados`: `AbertoState` -> `EmAtendimentoState` -> `ResolvidoState` -> `FechadoState`.',
      '`ChamadoStatusContext.js` recebe o status atual e delega para a classe de estado decidir o proximo status.',
      'A rota `PUT /api/chamados/:id/status` chama o service de chamados, que atualiza o status respeitando essa regra.',
    ].join('\n'),
  },
  {
    termos: ['imagem', 'anexo', 'foto', 'arquivo'],
    resposta: [
      'As imagens anexadas sao tratadas no front-end antes de criar o chamado.',
      '',
      '`front-end/src/utils/imageAttachments.js` converte os arquivos escolhidos em anexos com dados da imagem.',
      '`front-end/src/pages/NovoChamado.jsx` e `front-end/src/components/NovoChamadoPanel.jsx` usam essa funcao e enviam os anexos junto com o chamado.',
      'Depois, `front-end/src/pages/DetalhesChamado.jsx` mostra os anexos no detalhe do chamado.',
    ].join('\n'),
  },
  {
    termos: ['openai', 'assistente', 'central', 'ajuda', 'perguntar'],
    resposta: [
      'A Central de Ajuda usa uma fronteira cliente/servidor simples.',
      '',
      'No front-end, `front-end/src/pages/CentralAjuda.jsx` envia a pergunta para `perguntarAssistente` em `front-end/src/services/api.js`.',
      'Essa chamada vai para `POST /api/assistente/perguntar` no back-end.',
      'No back-end, `back-end/src/services/assistenteService.js` monta o contexto do codigo com `codeContextService.js` e chama a OpenAI pela Responses API.',
      'A `OPENAI_API_KEY` fica somente em `back-end/.env`.',
    ].join('\n'),
  },
  {
    termos: ['rota', 'endpoint', 'api'],
    resposta: [
      'As rotas principais ficam em `back-end/src/routes`.',
      '',
      '`GET /api/health` verifica a API.',
      '`/api/chamados` lista, cria, busca por id e avanca status de chamados.',
      '`/api/usuarios` lista e cria usuarios.',
      '`/api/tecnicos` lista e cria tecnicos.',
      '`POST /api/assistente/perguntar` recebe perguntas da Central de Ajuda e responde sobre o projeto.',
    ].join('\n'),
  },
  {
    termos: ['chamado', 'chamados', 'novo', 'criar', 'abrir', 'ticket'],
    resposta: [
      'A abertura de chamados passa pelo front-end e pelo service do back-end.',
      '',
      'No front-end, `front-end/src/pages/NovoChamado.jsx` monta o formulario com titulo, descricao, categoria, solicitante e anexos.',
      'A chamada HTTP fica em `front-end/src/services/api.js`, na funcao `criarChamado`.',
      'No back-end, `back-end/src/services/chamadoService.js` valida campos obrigatorios e usa `ChamadoFactory` para criar o chamado conforme a categoria.',
      'Os dados ficam em memoria por meio de `back-end/src/repositories/InMemoryRepository.js`.',
    ].join('\n'),
  },
  {
    termos: ['usuario', 'usuarios', 'tecnico', 'tecnicos', 'cadastro'],
    resposta: [
      'Usuarios e tecnicos seguem um CRUD simples no projeto.',
      '',
      'As telas ficam em `front-end/src/pages/Usuarios.jsx` e `front-end/src/pages/Tecnicos.jsx`.',
      'As chamadas HTTP ficam em `front-end/src/services/api.js`.',
      'No back-end, as rotas estao em `back-end/src/routes/usuarioRoutes.js` e `back-end/src/routes/tecnicoRoutes.js`.',
      'As regras principais ficam em `back-end/src/services/usuarioService.js` e `back-end/src/services/tecnicoService.js`.',
    ].join('\n'),
  },
  {
    termos: ['dashboard', 'relatorio', 'relatorios', 'grafico', 'graficos', 'metricas'],
    resposta: [
      'Dashboard e relatorios sao calculados no front-end a partir dos chamados carregados da API.',
      '',
      '`front-end/src/pages/Dashboard.jsx` mostra os indicadores principais.',
      '`front-end/src/pages/Relatorios.jsx` mostra graficos por status, categoria e periodo.',
      '`front-end/src/utils/chamadoMetrics.js` centraliza os calculos usados nessas telas.',
      'Os graficos usam a biblioteca Recharts.',
    ].join('\n'),
  },
  {
    termos: ['deploy', 'producao', 'produção', 'ambiente', 'vite_api_url'],
    resposta: [
      'Para deploy, publique o back-end como API Node/Express e o front-end como app estatico Vite.',
      '',
      'No back-end, configure `OPENAI_API_KEY`, `OPENAI_MODEL`, `OPENAI_MAX_OUTPUT_TOKENS` e `OPENAI_LOCAL_MODE` no provedor.',
      'No front-end, use `VITE_API_URL=https://sua-api.com/api` quando a API nao estiver em `localhost:8080`.',
      'A chave da OpenAI deve continuar apenas no ambiente do back-end.',
    ].join('\n'),
  },
];

function normalizarHistorico(historico = []) {
  return historico
    .slice(-8)
    .filter((mensagem) => ['user', 'assistant'].includes(mensagem.role) && mensagem.content)
    .map((mensagem) => `${mensagem.role === 'user' ? 'Usuario' : 'Assistente'}: ${mensagem.content}`)
    .join('\n');
}

function limitarTexto(texto, maximo = 9000) {
  const conteudo = String(texto || '').trim();

  if (conteudo.length <= maximo) {
    return conteudo;
  }

  return `${conteudo.slice(0, maximo)}\n\n[contexto operacional truncado]`;
}

function normalizarContextoAplicacao(contextoAplicacao) {
  if (!contextoAplicacao) {
    return '';
  }

  if (typeof contextoAplicacao === 'string') {
    return limitarTexto(contextoAplicacao);
  }

  return limitarTexto(JSON.stringify(contextoAplicacao, null, 2));
}

function extrairTexto(response) {
  if (response.output_text) {
    return response.output_text;
  }

  return response.output
    ?.flatMap((item) => item.content ?? [])
    ?.filter((content) => content.type === 'output_text')
    ?.map((content) => content.text)
    ?.join('\n')
    ?.trim();
}

function normalizarTermos(texto) {
  return String(texto)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function contemAlgum(texto, termos) {
  return termos.some((termo) => texto.includes(normalizarTermos(termo)));
}

function formatarLista(lista, formatador, vazio = 'Nenhum item encontrado.') {
  if (!Array.isArray(lista) || lista.length === 0) {
    return vazio;
  }

  return lista.map(formatador).join('\n');
}

function responderComContextoOperacional(pergunta, contextoAplicacao) {
  const contexto = typeof contextoAplicacao === 'object' && contextoAplicacao !== null ? contextoAplicacao : {};
  const perguntaNormalizada = normalizarTermos(pergunta);
  const resumo = contexto.resumo || {};
  const usuarios = Array.isArray(contexto.usuarios) ? contexto.usuarios : [];
  const tecnicos = Array.isArray(contexto.tecnicos) ? contexto.tecnicos : [];
  const chamados = Array.isArray(contexto.chamados) ? contexto.chamados : [];
  const pedeLista = contemAlgum(perguntaNormalizada, ['quais', 'nomes', 'nome', 'lista', 'listar', 'mostre', 'mostrar', 'quem sao', 'quem são']);
  const pedeTecnicos = contemAlgum(perguntaNormalizada, ['tecnico', 'tecnicos', 'técnico', 'técnicos', 'atendente', 'atendentes']);
  const pedeUsuarios = contemAlgum(perguntaNormalizada, ['usuario', 'usuarios', 'usuário', 'usuários']);
  const pedeChamados = contemAlgum(perguntaNormalizada, ['chamado', 'chamados', 'ticket', 'tickets']);
  const pedeCodigo = contemAlgum(perguntaNormalizada, [
    'codigo',
    'código',
    'arquivo',
    'rota',
    'endpoint',
    'api',
    'service',
    'controller',
    'factory',
    'state',
    'implementado',
    'implementacao',
    'implementação',
    'classe',
    'funcao',
    'função',
  ]);

  if (pedeTecnicos && pedeLista && !pedeCodigo) {
    return [
      `Temos ${resumo.totalTecnicos ?? tecnicos.length} tecnicos cadastrados no AssistTech.`,
      '',
      formatarLista(tecnicos, (tecnico) => `- ${tecnico.nome}${tecnico.especialidade ? ` (${tecnico.especialidade})` : ''}`),
    ].join('\n');
  }

  if (pedeUsuarios && pedeLista && !pedeCodigo) {
    return [
      `Temos ${resumo.totalUsuarios ?? usuarios.length} usuarios cadastrados no AssistTech.`,
      '',
      formatarLista(usuarios, (usuario) => `- ${usuario.nome}${usuario.setor ? ` (${usuario.setor})` : ''}`),
    ].join('\n');
  }

  if (pedeChamados && pedeLista && !pedeCodigo) {
    return [
      `Recebi ${chamados.length} chamado(s) no contexto atual da tela.`,
      '',
      formatarLista(
        chamados,
        (chamado) => `- #${chamado.id} ${chamado.titulo} | ${chamado.status} | ${chamado.categoria} | Tecnico: ${chamado.tecnico || 'A definir'}`,
      ),
    ].join('\n');
  }

  if (perguntaNormalizada.includes('quantos') && perguntaNormalizada.includes('usuario')) {
    return [
      `Temos ${resumo.totalUsuarios ?? usuarios.length} usuarios cadastrados no AssistTech.`,
      '',
      formatarLista(usuarios, (usuario) => `- ${usuario.nome}${usuario.setor ? ` (${usuario.setor})` : ''}`),
    ].join('\n');
  }

  if (perguntaNormalizada.includes('quantos') && pedeTecnicos) {
    return [
      `Temos ${resumo.totalTecnicos ?? tecnicos.length} tecnicos cadastrados no AssistTech.`,
      '',
      formatarLista(tecnicos, (tecnico) => `- ${tecnico.nome}${tecnico.especialidade ? ` (${tecnico.especialidade})` : ''}`),
    ].join('\n');
  }

  if (perguntaNormalizada.includes('quantos') && pedeChamados) {
    return [
      `Temos ${resumo.totalChamados ?? chamados.length} chamados no AssistTech.`,
      '',
      resumo.chamadosPorStatus
        ? `Por status: ${Object.entries(resumo.chamadosPorStatus).map(([status, total]) => `${status}: ${total}`).join(', ')}.`
        : 'Nao recebi a divisao por status no contexto atual.',
    ].join('\n');
  }

  if (perguntaNormalizada.includes('em atendimento')) {
    const emAtendimento = chamados.filter((chamado) => normalizarTermos(chamado.status) === 'em atendimento');

    return [
      `Encontrei ${emAtendimento.length} chamado(s) em atendimento no contexto atual.`,
      '',
      formatarLista(
        emAtendimento,
        (chamado) => `- #${chamado.id} ${chamado.titulo} | ${chamado.categoria} | Tecnico: ${chamado.tecnico || 'A definir'}`,
      ),
    ].join('\n');
  }

  if (perguntaNormalizada.includes('hardware') && perguntaNormalizada.includes('quem') && !pedeCodigo) {
    const tecnico = tecnicos.find((item) => normalizarTermos(item.especialidade) === 'hardware');
    return tecnico
      ? `Quem atende Hardware no AssistTech e ${tecnico.nome}.`
      : 'Nao encontrei tecnico de Hardware no contexto atual.';
  }

  return null;
}

function responderLocalmente(pergunta, motivo = 'OPENAI_LOCAL_FALLBACK', contextoAplicacao) {
  const respostaOperacional = responderComContextoOperacional(pergunta, contextoAplicacao);

  if (respostaOperacional) {
    return {
      resposta: respostaOperacional,
      modelo: 'apoio-do-projeto',
      aviso: `A OpenAI foi consultada, mas nao respondeu para esta chave (${motivo}). Usei os dados atuais do AssistTech como apoio.`,
    };
  }

  const perguntaNormalizada = normalizarTermos(pergunta);
  const respostaEncontrada = respostasLocais.find(({ termos }) => (
    termos.some((termo) => perguntaNormalizada.includes(normalizarTermos(termo)))
  ));

  const resposta = respostaEncontrada?.resposta ?? [
    'Nao encontrei uma resposta especifica pronta para essa pergunta, mas posso te orientar pelo AssistTech.',
    '',
    'Se a duvida for sobre dados do sistema, pergunte por exemplo:',
    '- "Quais sao os nomes dos tecnicos?"',
    '- "Quantos usuarios temos?"',
    '- "Quais chamados estao em atendimento?"',
    '',
    'Se a duvida for sobre codigo, pergunte por exemplo:',
    '- "Onde o Factory Method foi aplicado no codigo?"',
    '- "Como funciona a troca de status com State?"',
    '- "Qual rota cria um chamado?"',
  ].join('\n');

  return {
    resposta,
    modelo: 'apoio-do-projeto',
    aviso: `A OpenAI foi consultada, mas nao respondeu para esta chave (${motivo}). Usei uma resposta de apoio do AssistTech.`,
  };
}

function normalizarErroOpenAI(error) {
  const status = error.status ?? error.statusCode;
  const code = error.code ?? error.error?.code;
  const type = error.type ?? error.error?.type;

  if (status === 429 && (code === 'insufficient_quota' || type === 'insufficient_quota')) {
    return new AppError(
      'A IA esta temporariamente indisponivel porque a conta da OpenAI atingiu o limite de uso. Verifique o plano, billing ou troque a OPENAI_API_KEY no back-end.',
      503,
      'OPENAI_QUOTA_EXCEEDED',
    );
  }

  if (status === 429) {
    return new AppError(
      'A IA recebeu muitas solicitacoes em pouco tempo. Aguarde um momento e tente novamente.',
      429,
      'OPENAI_RATE_LIMIT',
    );
  }

  if (status === 401) {
    return new AppError(
      'A chave OPENAI_API_KEY configurada no back-end nao foi aceita. Confira a variavel de ambiente.',
      503,
      'OPENAI_INVALID_KEY',
    );
  }

  if (status === 404 || code === 'model_not_found') {
    return new AppError(
      'O modelo configurado em OPENAI_MODEL nao esta disponivel para esta chave. Troque por um modelo habilitado na sua conta, como gpt-4.1-mini ou outro modelo economico disponivel.',
      503,
      'OPENAI_MODEL_UNAVAILABLE',
    );
  }

  return new AppError(
    'Nao foi possivel consultar a IA agora. Tente novamente em instantes.',
    503,
    'OPENAI_UNAVAILABLE',
  );
}

const assistenteService = {
  async perguntar({ pergunta, historico, contextoAplicacao }) {
    if (!pergunta || String(pergunta).trim() === '') {
      throw new AppError('Informe uma pergunta para a central de ajuda.', 422, 'QUESTION_REQUIRED');
    }

    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_LOCAL_MODE === 'true') {
      return responderLocalmente(pergunta, process.env.OPENAI_API_KEY ? 'OPENAI_LOCAL_MODE' : 'OPENAI_KEY_MISSING', contextoAplicacao);
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const contexto = montarContextoDoCodigo();
    const conversa = normalizarHistorico(historico);
    const contextoOperacional = normalizarContextoAplicacao(contextoAplicacao);

    let response;

    try {
      response = await client.responses.create({
        model,
        instructions,
        max_output_tokens: maxOutputTokens,
        reasoning: { effort: 'low' },
        input: [
          {
            role: 'user',
            content: [
              {
                type: 'input_text',
                text: [
                  contextoOperacional ? `Contexto operacional atual do AssistTech:\n${contextoOperacional}` : '',
                  `Contexto do codigo:\n${contexto}`,
                  conversa ? `Historico recente:\n${conversa}` : '',
                  `Pergunta atual:\n${String(pergunta).trim()}`,
                ].filter(Boolean).join('\n\n'),
              },
            ],
          },
        ],
      });
    } catch (error) {
      const erroNormalizado = normalizarErroOpenAI(error);
      if (permitirFallbackLocal) {
        return responderLocalmente(pergunta, erroNormalizado.code, contextoAplicacao);
      }

      throw erroNormalizado;
    }

    return {
      resposta: extrairTexto(response) || 'Nao consegui gerar uma resposta agora.',
      modelo: model,
    };
  },
};

export default assistenteService;
