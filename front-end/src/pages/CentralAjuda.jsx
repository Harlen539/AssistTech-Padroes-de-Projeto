import { Bot, Code2, LoaderCircle, Send, Sparkles, TerminalSquare } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';
import Header from '../components/Header';
import { perguntarAssistente } from '../services/api';

const sugestoes = [
  'Como eu rodo o front-end e o back-end?',
  'Onde o Factory Method foi aplicado?',
  'Como funciona a troca de status com State?',
  'Como a imagem anexada aparece no chamado?',
];

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
      });

      setMensagens((atuais) => [
        ...atuais,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: resposta.resposta,
          modelo: resposta.modelo,
        },
      ]);
    } catch (error) {
      const detalhe = error.response?.data?.erro ?? 'Nao foi possivel conectar com a IA agora.';
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
            <p>Conectada ao codigo do front-end e back-end para responder sobre estrutura, uso e manutencao.</p>
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
                    {mensagem.modelo && <small>{mensagem.modelo}</small>}
                  </div>
                </article>
              ))}
              {enviando && (
                <article className="help-message assistant">
                  <div className="help-message-avatar"><Bot /></div>
                  <div className="help-message-copy loading">
                    <LoaderCircle />
                    <p>Consultando o codigo...</p>
                  </div>
                </article>
              )}
            </div>

            <form className="help-composer" onSubmit={enviarFormulario}>
              <input
                ref={inputRef}
                value={pergunta}
                onChange={(event) => setPergunta(event.target.value)}
                placeholder="Pergunte sobre o codigo, API, telas ou como rodar o projeto"
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
