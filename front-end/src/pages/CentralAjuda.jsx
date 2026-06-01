import { Bot, Code2, LoaderCircle, Send, Sparkles, TerminalSquare } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';
import Header from '../components/Header';
import { perguntarAssistente } from '../services/api';

const sugestoes = [
  'Como eu rodo o front-end e o back-end?',
  'Onde o Factory Method foi aplicado?',
  'Como funciona a troca de status com State?',
  'Quais sao os nomes dos tecnicos?',
  'Quantos usuarios temos?',
  'Quais chamados estao em atendimento?',
];

const mensagensErroAssistente = {
  OPENAI_QUOTA_EXCEEDED: 'A conta da OpenAI atingiu o limite de uso da API. O ChatGPT Plus nao libera creditos de API automaticamente; ative billing na Platform ou use outra OPENAI_API_KEY.',
  OPENAI_RATE_LIMIT: 'A IA recebeu muitas solicitacoes em pouco tempo. Aguarde um momento e tente novamente.',
  OPENAI_INVALID_KEY: 'A chave OPENAI_API_KEY do back-end nao foi aceita. Confira a variavel de ambiente.',
  OPENAI_KEY_MISSING: 'Configure a variavel OPENAI_API_KEY no back-end para ativar a IA.',
  OPENAI_MODEL_UNAVAILABLE: 'O modelo configurado em OPENAI_MODEL nao esta disponivel para essa chave. Troque o modelo no back-end.',
};

function obterMensagemErroAssistente(error) {
  const codigo = error.response?.data?.codigo;

  if (codigo && mensagensErroAssistente[codigo]) {
    return mensagensErroAssistente[codigo];
  }

  return error.response?.data?.erro ?? 'Nao foi possivel conectar com a IA agora.';
}

function contarPorCampo(lista, campo) {
  return lista.reduce((acc, item) => {
    const chave = item[campo] || 'Nao informado';
    acc[chave] = (acc[chave] || 0) + 1;
    return acc;
  }, {});
}

function montarContextoAplicacao({ chamados, usuarios, tecnicos }) {
  return {
    resumo: {
      totalChamados: chamados.length,
      totalUsuarios: usuarios.length,
      totalTecnicos: tecnicos.length,
      chamadosPorStatus: contarPorCampo(chamados, 'status'),
      chamadosPorCategoria: contarPorCampo(chamados, 'categoria'),
      usuariosPorSetor: contarPorCampo(usuarios, 'setor'),
      tecnicosPorEspecialidade: contarPorCampo(tecnicos, 'especialidade'),
    },
    chamados: chamados.slice(0, 12).map((chamado) => ({
      id: chamado.id,
      titulo: chamado.titulo,
      categoria: chamado.categoria,
      prioridade: chamado.prioridade,
      status: chamado.status,
      solicitante: chamado.solicitante,
      tecnico: chamado.tecnico,
      atualizadoEm: chamado.atualizadoEm,
    })),
    usuarios: usuarios.slice(0, 20).map((usuario) => ({
      id: usuario.id,
      nome: usuario.nome,
      setor: usuario.setor,
      email: usuario.email,
    })),
    tecnicos: tecnicos.slice(0, 20).map((tecnico) => ({
      id: tecnico.id,
      nome: tecnico.nome,
      especialidade: tecnico.especialidade,
    })),
  };
}

function CentralAjuda({ chamados, usuarios, tecnicos, onMenuClick }) {
  const [mensagens, setMensagens] = useState([
    {
      id: 'boas-vindas',
      role: 'assistant',
      content: 'Oi. Posso tirar duvidas sobre o codigo, rotas, telas, API, padroes de projeto e como usar o AssistTech.',
    },
  ]);
  const [pergunta, setPergunta] = useState('');
  const [enviando, setEnviando] = useState(false);
  const inputRef = useRef(null);

  const resumo = useMemo(() => [
    { label: 'Chamados', value: chamados.length },
    { label: 'Usuarios', value: usuarios.length },
    { label: 'Tecnicos', value: tecnicos.length },
  ], [chamados.length, tecnicos.length, usuarios.length]);

  async function enviarPergunta(textoManual) {
    const texto = (textoManual ?? pergunta).trim();

    if (!texto || enviando) {
      return;
    }

    const mensagemUsuario = { id: crypto.randomUUID(), role: 'user', content: texto };
    const proximasMensagens = [...mensagens, mensagemUsuario];
    setMensagens(proximasMensagens);
    setPergunta('');
    setEnviando(true);

    try {
      const resposta = await perguntarAssistente({
        pergunta: texto,
        historico: proximasMensagens.map(({ role, content }) => ({ role, content })),
        contextoAplicacao: montarContextoAplicacao({ chamados, usuarios, tecnicos }),
      });

      setMensagens((atuais) => [
        ...atuais,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: resposta.resposta,
          modelo: resposta.modelo,
          aviso: resposta.aviso,
        },
      ]);
    } catch (error) {
      const detalhe = obterMensagemErroAssistente(error);
      setMensagens((atuais) => [
        ...atuais,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: detalhe,
          erro: true,
        },
      ]);
    } finally {
      setEnviando(false);
      inputRef.current?.focus();
    }
  }

  function enviarFormulario(event) {
    event.preventDefault();
    enviarPergunta();
  }

  return (
    <>
      <Header
        title="Central de Ajuda"
        subtitle="Assistente inteligente para duvidas do AssistTech"
        onMenuClick={onMenuClick}
      />
      <div className="page-content help-page">
        <section className="help-shell">
          <div className="help-context-panel">
            <div className="help-ai-badge">
              <Sparkles />
              <span>OpenAI</span>
            </div>
            <h2>IA do projeto</h2>
            <p>Tira duvidas sobre uso, chamados, usuarios, tecnicos, telas e codigo. A chave fica protegida no servidor.</p>
            <div className="help-summary">
              {resumo.map((item) => (
                <span key={item.label}>
                  <strong>{item.value}</strong>
                  <small>{item.label}</small>
                </span>
              ))}
            </div>
            <div className="help-topics">
              <span><Code2 /> Codigo</span>
              <span><TerminalSquare /> Execucao</span>
              <span><Bot /> Padroes</span>
            </div>
          </div>

          <section className="help-chat">
            <div className="help-suggestions">
              {sugestoes.map((sugestao) => (
                <button key={sugestao} type="button" onClick={() => enviarPergunta(sugestao)} disabled={enviando}>
                  {sugestao}
                </button>
              ))}
            </div>

            <div className="help-messages" aria-live="polite">
              {mensagens.map((mensagem) => (
                <article key={mensagem.id} className={`help-message ${mensagem.role} ${mensagem.erro ? 'error' : ''}`}>
                  <div className="help-message-avatar">{mensagem.role === 'assistant' ? <Bot /> : 'CS'}</div>
                  <div className="help-message-copy">
                    <p>{mensagem.content}</p>
                    {mensagem.modelo && <small>{mensagem.modelo === 'apoio-do-projeto' ? 'Apoio do projeto' : mensagem.modelo}</small>}
                    {mensagem.aviso && mensagem.modelo !== 'apoio-do-projeto' && <small>{mensagem.aviso}</small>}
                  </div>
                </article>
              ))}
              {enviando && (
                <article className="help-message assistant">
                  <div className="help-message-avatar"><Bot /></div>
                  <div className="help-message-copy loading">
                    <LoaderCircle />
                    <p>Consultando a IA e o contexto do AssistTech...</p>
                  </div>
                </article>
              )}
            </div>

            <form className="help-composer" onSubmit={enviarFormulario}>
              <input
                ref={inputRef}
                value={pergunta}
                onChange={(event) => setPergunta(event.target.value)}
                placeholder="Pergunte sobre chamados, usuarios, tecnicos, telas, API ou codigo"
              />
              <button type="submit" className="primary-button" disabled={enviando || !pergunta.trim()}>
                <Send />
                Enviar
              </button>
            </form>
          </section>
        </section>
      </div>
    </>
  );
}

export default CentralAjuda;
