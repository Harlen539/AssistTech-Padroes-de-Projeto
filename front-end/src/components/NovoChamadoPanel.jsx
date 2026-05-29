import { Paperclip, Send, X } from 'lucide-react';
import { useState } from 'react';
import { criarAnexosDeImagem } from '../utils/imageAttachments';

const vazio = { titulo: '', descricao: '', categoria: '' };

function NovoChamadoPanel({ onSubmit, open = true, onClose }) {
  const [form, setForm] = useState(vazio);
  const [feedback, setFeedback] = useState('');
  const [anexos, setAnexos] = useState([]);

  function alterar(event) {
    const { name, value } = event.target;
    setForm((atual) => ({ ...atual, [name]: value }));
  }

  async function anexarImagens(event) {
    const imagens = await criarAnexosDeImagem(event.target.files);
    setAnexos(imagens);
  }

  async function enviar(event) {
    event.preventDefault();
    const resultado = await onSubmit({ ...form, anexos });
    setForm(vazio);
    setAnexos([]);
    event.target.reset();
    setFeedback(
      resultado.offline
        ? 'Chamado criado em modo visual. A API não está disponível.'
        : 'Chamado enviado com sucesso.',
    );
  }

  function cancelar() {
    setForm(vazio);
    setAnexos([]);
    setFeedback('');
    onClose?.();
  }

  return (
    <aside className={`new-ticket-panel ${open ? 'open' : ''}`}>
      <div className="panel-title">
        <h2>Novo Chamado</h2>
        <button type="button" className="icon-action" onClick={cancelar} aria-label="Fechar painel">
          <X />
        </button>
      </div>
      <form className="ticket-form panel-form" onSubmit={enviar}>
        <label>
          <span className="field-label">Título <em>*</em></span>
          <input
            required
            name="titulo"
            value={form.titulo}
            onChange={alterar}
            placeholder="Digite um título claro e objetivo"
          />
        </label>
        <label>
          <span className="field-label">Descrição <em>*</em></span>
          <textarea
            required
            name="descricao"
            value={form.descricao}
            onChange={alterar}
            placeholder="Descreva o problema ou solicitação com detalhes para que possamos ajudar melhor."
          />
        </label>
        <label>
          <span className="field-label">Categoria <em>*</em></span>
          <select required name="categoria" value={form.categoria} onChange={alterar}>
            <option value="">Selecione uma categoria</option>
            <option>Hardware</option>
            <option>Software</option>
            <option>Rede</option>
            <option>Acesso</option>
          </select>
        </label>
        <div className="form-field">
          Anexos
          <input className="hidden-file" id="painel-anexo" type="file" accept="image/*" multiple onChange={anexarImagens} />
          <label className="attachment-drop" htmlFor="painel-anexo">
            <Paperclip />
            <span>{anexos.length ? `${anexos.length} imagem(ns) selecionada(s)` : <>Arraste imagens aqui ou<br /> clique para selecionar</>}</span>
          </label>
          {anexos.length > 0 && (
            <div className="attachment-preview-list compact">
              {anexos.map((anexo) => (
                <figure key={anexo.id} className="attachment-preview">
                  <img src={anexo.url} alt={anexo.nome} />
                  <figcaption>{anexo.nome}</figcaption>
                </figure>
              ))}
            </div>
          )}
        </div>
        {feedback && <p className="form-feedback">{feedback}</p>}
        <div className="panel-actions">
          <button className="outline-button" type="button" onClick={cancelar}>Cancelar</button>
          <button className="primary-button" type="submit"><Send />Enviar Chamado</button>
        </div>
      </form>
    </aside>
  );
}

export default NovoChamadoPanel;
