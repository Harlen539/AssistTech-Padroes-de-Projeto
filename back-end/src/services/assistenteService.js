import OpenAI from 'openai';
import { montarContextoDoCodigo } from './codeContextService.js';
import { AppError } from '../utils/AppError.js';

const model = process.env.OPENAI_MODEL || 'gpt-4.1-mini';

function normalizarHistorico(historico = []) {
  return historico
    .slice(-8)
    .filter((mensagem) => ['user', 'assistant'].includes(mensagem.role) && mensagem.content)
    .map((mensagem) => `${mensagem.role === 'user' ? 'Usuario' : 'Assistente'}: ${mensagem.content}`)
    .join('\n');
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

const assistenteService = {
  async perguntar({ pergunta, historico }) {
    if (!process.env.OPENAI_API_KEY) {
      throw new AppError('Configure a variavel OPENAI_API_KEY no back-end para ativar a IA.', 503);
    }

    if (!pergunta || String(pergunta).trim() === '') {
      throw new AppError('Informe uma pergunta para a central de ajuda.', 422);
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const contexto = montarContextoDoCodigo();
    const conversa = normalizarHistorico(historico);

    const response = await client.responses.create({
      model,
      instructions: [
        'Voce e a IA da Central de Ajuda do AssistTech.',
        'Responda em portugues do Brasil, de forma direta e pratica.',
        'Use o contexto do codigo abaixo para explicar funcionamento, uso, rotas, componentes, padroes Factory Method e State, e como rodar o projeto.',
        'Quando citar arquivos, use caminhos reais do projeto.',
        'Se a resposta depender de algo que nao aparece no contexto, diga isso claramente e sugira onde verificar.',
        'Nao invente credenciais, chaves de API ou comportamento que nao esteja no codigo.',
      ].join(' '),
      input: [
        {
          role: 'user',
          content: [
            {
              type: 'input_text',
              text: [
                `Contexto do codigo:\n${contexto}`,
                conversa ? `Historico recente:\n${conversa}` : '',
                `Pergunta atual:\n${String(pergunta).trim()}`,
              ].filter(Boolean).join('\n\n'),
            },
          ],
        },
      ],
    });

    return {
      resposta: extrairTexto(response) || 'Nao consegui gerar uma resposta agora.',
      modelo: model,
    };
  },
};

export default assistenteService;
