import { Building2, Mail, Pencil, Search, Trash2, UserRound, UserRoundPlus, UsersRound } from 'lucide-react';
import { useMemo, useState } from 'react';
import CategoryLabel from '../components/CategoryLabel';
import FormCard from '../components/FormCard';
import Header from '../components/Header';
import Pagination from '../components/Pagination';
import PersonAvatar from '../components/PersonAvatar';

const inicial = { nome: '', email: '', setor: '' };

function Usuarios({ usuarios, adicionarUsuario, removerUsuario, onMenuClick }) {
  const [form, setForm] = useState(inicial);
  const [busca, setBusca] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [editando, setEditando] = useState(null);

  const usuariosFiltrados = useMemo(() => {
    const termo = busca.toLowerCase();
    return usuarios.filter((usuario) =>
      !termo || usuario.nome.toLowerCase().includes(termo) || usuario.email.toLowerCase().includes(termo),
    );
  }, [busca, usuarios]);

  function alterar(event) {
    setForm((atual) => ({ ...atual, [event.target.name]: event.target.value }));
  }

  async function enviar(event) {
    event.preventDefault();
    const offline = await adicionarUsuario(form, editando);
    setForm(inicial);
    setEditando(null);
    setMensagem(editando ? 'Usuário atualizado com sucesso.' : offline ? 'Usuário cadastrado em modo visual/mockado.' : 'Usuário cadastrado com sucesso.');
  }

  function editar(usuario) {
    setForm({ nome: usuario.nome, email: usuario.email, setor: usuario.setor });
    setEditando(usuario.id);
    setMensagem('Editando usuário selecionado.');
  }

  function excluir(usuario) {
    removerUsuario(usuario.id);
    if (editando === usuario.id) {
      setForm(inicial);
      setEditando(null);
    }
    setMensagem('Usuário excluído da lista visual.');
  }

  return (
    <>
      <Header title="Usuários" subtitle="Gerencie os usuários do sistema" onMenuClick={onMenuClick} />
      <div className="page-content register-grid">
        <FormCard title={editando ? 'Editar Usuário' : 'Cadastrar Usuário'} icon={UserRoundPlus} className="registration-card">
          <form className="management-form-content" onSubmit={enviar}>
            <label>
              <span className="field-label">Nome <em>*</em></span>
              <span className="input-with-icon"><UserRound /><input required name="nome" value={form.nome} onChange={alterar} placeholder="Digite o nome completo" /></span>
            </label>
            <label>
              <span className="field-label">E-mail <em>*</em></span>
              <span className="input-with-icon"><Mail /><input required type="email" name="email" value={form.email} onChange={alterar} placeholder="Digite o e-mail do usuário" /></span>
            </label>
            <label>
              <span className="field-label">Setor <em>*</em></span>
              <span className="input-with-icon"><Building2 /><select required name="setor" value={form.setor} onChange={alterar}>
                <option value="">Selecione um setor</option>
                <option>Financeiro</option>
                <option>Comercial</option>
                <option>Recursos Humanos</option>
                <option>Administrativo</option>
              </select></span>
            </label>
            {mensagem && <p className="form-feedback">{mensagem}</p>}
            <button type="submit" className="primary-button full-width"><UserRoundPlus />{editando ? 'Salvar Alterações' : 'Cadastrar Usuário'}</button>
          </form>
        </FormCard>
        <section className="directory-card">
          <div className="directory-header">
            <h2><UsersRound />Usuários Cadastrados</h2>
            <label className="directory-search">
              <Search />
              <input value={busca} onChange={(event) => setBusca(event.target.value)} placeholder="Buscar usuários..." />
            </label>
          </div>
          <div className="directory-table-wrapper">
            <table className="directory-table">
              <thead><tr><th>Nome</th><th>E-mail</th><th>Setor</th><th>Ações</th></tr></thead>
              <tbody>
                {usuariosFiltrados.map((usuario) => (
                  <tr key={usuario.id}>
                    <td><span className="assignee"><PersonAvatar name={usuario.nome} size="small" />{usuario.nome}</span></td>
                    <td>{usuario.email}</td>
                    <td><CategoryLabel category={usuario.setor} boxed /></td>
                    <td className="row-actions">
                      <button type="button" onClick={() => editar(usuario)} aria-label={`Editar ${usuario.nome}`}><Pencil /></button>
                      <button type="button" onClick={() => excluir(usuario)} className="danger" aria-label={`Excluir ${usuario.nome}`}><Trash2 /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mobile-directory-list">
            {usuariosFiltrados.map((usuario) => (
              <article key={usuario.id} className="directory-mobile-card">
                <span className="assignee"><PersonAvatar name={usuario.nome} size="small" />{usuario.nome}</span>
                <p>{usuario.email}</p>
                <CategoryLabel category={usuario.setor} boxed />
                <div className="row-actions">
                  <button type="button" onClick={() => editar(usuario)} aria-label={`Editar ${usuario.nome}`}><Pencil /></button>
                  <button type="button" onClick={() => excluir(usuario)} className="danger" aria-label={`Excluir ${usuario.nome}`}><Trash2 /></button>
                </div>
              </article>
            ))}
          </div>
          <Pagination summary={`Mostrando 1 a ${usuariosFiltrados.length} de ${usuarios.length} usuários`} pages={['1']} />
        </section>
      </div>
    </>
  );
}

export default Usuarios;
