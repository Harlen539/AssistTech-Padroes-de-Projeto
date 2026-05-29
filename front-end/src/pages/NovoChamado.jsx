import { FilePlus2, Send, UploadCloud } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormCard from '../components/FormCard';
import Header from '../components/Header';
import { criarAnexosDeImagem } from '../utils/imageAttachments';

const formularioInicial = { titulo: '', descricao: '', categoria: '', solicitante: '' };

function NovoChamado({ adicionarChamado, usuarios, onMenuClick }) {
  const navigate = useNavigate();
  const [form, setForm] = useState(formularioInicial);
  const [mensagem, setMensagem] = useState('');
  const [anexos, setAnexos] = useState([]);

  function alterar(event) {
    setForm((atual) => ({ ...atual, [event.target.name]: event.target.value }));
  }

  async function anexarImagens(event) {
    const imagens = await criarAnexosDeImagem(event.target.files);
    setAnexos(imagens);
  }

  async function enviar(event) {
    event.preventDefault();
    const resposta = await adicionarChamado({ ...form, anexos });
    setForm(formularioInicial);
    setAnexos([]);
    event.target.reset();
    setMensagem(
      resposta.offline
        ? 'Chamado salvo em modo visual/mockado, pois a API não respondeu.'
        : 'Chamado criado com sucesso.',
    );
  }

  return (
    <>
      <Header title="Novo Chamado" subtitle="Abra um novo chamado de suporte" onMenuClick={onMenuClick} />
      <div className="page-content new-ticket-page">
        <FormCard
          title="Novo Chamado"
          subtitle="Preencha os dados abaixo para abrir um novo chamado de suporte."
          icon={FilePlus2}
          className="new-ticket-card"
        >
          <form className="ticket-form full-ticket-form" onSubmit={enviar}>
            <label>
              <span className="field-label">Título <em>*</em></span>
              <input required name="titulo" value={form.titulo} onChange={alterar} placeholder="Digite um título claro e objetivo" />
            </label>
            <label>
              <span className="field-label">Descrição <em>*</em></span>
              <textarea required name="descricao" value={form.descricao} onChange={alterar} placeholder="Descreva o problema ou solicitação com detalhes para que possamos ajudar melhor." />
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
            <label>
              <span className="field-label">Usuário Solicitante <em>*</em></span>
              <select required name="solicitante" value={form.solicitante} onChange={alterar}>
                <option value="">Selecione o usuário solicitante</option>
                {usuarios.map((usuario) => <option key={usuario.id}>{usuario.nome}</option>)}
              </select>
            </label>
            <div className="form-field">
              Anexos
              <input className="hidden-file" id="novo-anexo" type="file" accept="image/*" multiple onChange={anexarImagens} />
              <label className="attachment-drop wide" htmlFor="novo-anexo">
                <span className="attachment-title"><UploadCloud /> {anexos.length ? `${anexos.length} imagem(ns) selecionada(s)` : 'Arraste imagens aqui ou clique para selecionar'}</span>
                <small>Formatos aceitos: PNG, JPG, JPEG, WEBP e outros formatos de imagem.</small>
              </label>
              {anexos.length > 0 && (
                <div className="attachment-preview-list">
                  {anexos.map((anexo) => (
                    <figure key={anexo.id} className="attachment-preview">
                      <img src={anexo.url} alt={anexo.nome} />
                      <figcaption>{anexo.nome}</figcaption>
                    </figure>
                  ))}
                </div>
              )}
            </div>
            {mensagem && <p className="form-feedback">{mensagem}</p>}
            <div className="form-card-actions">
              <button type="button" className="outline-button" onClick={() => navigate('/dashboard')}>Cancelar</button>
              <button type="submit" className="primary-button"><Send />Enviar Chamado</button>
            </div>
          </form>
        </FormCard>
      </div>
    </>
  );
}

export default NovoChamado;
