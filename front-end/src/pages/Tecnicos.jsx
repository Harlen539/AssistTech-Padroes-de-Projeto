import { BriefcaseBusiness, Pencil, Search, Trash2, UserRound, UserRoundPlus, UsersRound } from 'lucide-react';
import { useMemo, useState } from 'react';
import CategoryLabel from '../components/CategoryLabel';
import FormCard from '../components/FormCard';
import Header from '../components/Header';
import Pagination from '../components/Pagination';
import PersonAvatar from '../components/PersonAvatar';

const inicial = { nome: '', especialidade: '' };

function Tecnicos({ chamados, tecnicos, adicionarTecnico, removerTecnico, onMenuClick }) {
  const [form, setForm] = useState(inicial);
  const [busca, setBusca] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [editando, setEditando] = useState(null);

  const tecnicosComAtribuicoes = useMemo(() => tecnicos.map((tecnico) => ({
    ...tecnico,
    atribuidos: chamados.filter((chamado) => chamado.tecnico === tecnico.nome).length,
  })), [chamados, tecnicos]);

  const tecnicosFiltrados = useMemo(() => {
    const termo = busca.toLowerCase();
    return tecnicosComAtribuicoes.filter((tecnico) =>
      !termo || tecnico.nome.toLowerCase().includes(termo) || tecnico.especialidade.toLowerCase().includes(termo),
    );
  }, [busca, tecnicosComAtribuicoes]);

  function alterar(event) {
    setForm((atual) => ({ ...atual, [event.target.name]: event.target.value }));
  }

  async function enviar(event) {
    event.preventDefault();
    const offline = await adicionarTecnico(form, editando);
    setForm(inicial);
    setEditando(null);
    setMensagem(editando ? 'Técnico atualizado com sucesso.' : offline ? 'Técnico cadastrado em modo visual/mockado.' : 'Técnico cadastrado com sucesso.');
  }

  function editar(tecnico) {
    setForm({ nome: tecnico.nome, especialidade: tecnico.especialidade });
    setEditando(tecnico.id);
    setMensagem('Editando técnico selecionado.');
  }

  function excluir(tecnico) {
    removerTecnico(tecnico.id);
    if (editando === tecnico.id) {
      setForm(inicial);
      setEditando(null);
    }
    setMensagem('Técnico excluído da lista visual.');
  }

  return (
    <>
      <Header title="Técnicos" subtitle="Gerencie os técnicos da sua equipe" onMenuClick={onMenuClick} />
      <div className="page-content register-grid technicians-grid">
        <FormCard title={editando ? 'Editar Técnico' : 'Novo Técnico'} icon={UserRoundPlus} className="registration-card">
          <form className="management-form-content" onSubmit={enviar}>
            <label>
              <span className="field-label">Nome <em>*</em></span>
              <span className="input-with-icon"><UserRound /><input required name="nome" value={form.nome} onChange={alterar} placeholder="Digite o nome do técnico" /></span>
            </label>
            <label>
              <span className="field-label">Especialidade <em>*</em></span>
              <span className="input-with-icon"><BriefcaseBusiness /><select required name="especialidade" value={form.especialidade} onChange={alterar}>
                <option value="">Selecione uma especialidade</option>
                <option>Hardware</option>
                <option>Software</option>
                <option>Rede</option>
                <option>Acesso</option>
              </select></span>
            </label>
            {mensagem && <p className="form-feedback">{mensagem}</p>}
            <button type="submit" className="primary-button full-width"><UserRoundPlus />{editando ? 'Salvar Alterações' : 'Cadastrar Técnico'}</button>
          </form>
        </FormCard>
        <section className="directory-card">
          <div className="directory-header">
            <h2><UsersRound />Lista de Técnicos</h2>
            <label className="directory-search"><Search /><input value={busca} onChange={(event) => setBusca(event.target.value)} placeholder="Buscar técnicos..." /></label>
          </div>
          <div className="directory-table-wrapper">
            <table className="directory-table technician-table">
              <thead><tr><th>Nome</th><th>Especialidade</th><th>Chamados Atribuídos</th><th>Ações</th></tr></thead>
              <tbody>
                {tecnicosFiltrados.map((tecnico) => (
                  <tr key={tecnico.id}>
                    <td><span className="assignee"><PersonAvatar name={tecnico.nome} size="small" />{tecnico.nome}</span></td>
                    <td><CategoryLabel category={tecnico.especialidade} boxed /></td>
                    <td><span className="assigned-count">{tecnico.atribuidos ?? 0}</span></td>
                    <td className="row-actions">
                      <button type="button" onClick={() => editar(tecnico)} aria-label={`Editar ${tecnico.nome}`}><Pencil /></button>
                      <button type="button" onClick={() => excluir(tecnico)} className="danger" aria-label={`Excluir ${tecnico.nome}`}><Trash2 /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mobile-directory-list">
            {tecnicosFiltrados.map((tecnico) => (
              <article key={tecnico.id} className="directory-mobile-card">
                <span className="assignee"><PersonAvatar name={tecnico.nome} size="small" />{tecnico.nome}</span>
                <CategoryLabel category={tecnico.especialidade} boxed />
                <span className="assigned-count">{tecnico.atribuidos ?? 0} chamados</span>
                <div className="row-actions">
                  <button type="button" onClick={() => editar(tecnico)} aria-label={`Editar ${tecnico.nome}`}><Pencil /></button>
                  <button type="button" onClick={() => excluir(tecnico)} className="danger" aria-label={`Excluir ${tecnico.nome}`}><Trash2 /></button>
                </div>
              </article>
            ))}
          </div>
          <Pagination summary={`Mostrando 1 a ${tecnicosFiltrados.length} de ${tecnicos.length} técnicos`} pages={['1']} />
        </section>
      </div>
    </>
  );
}

export default Tecnicos;
