import { useMemo, useState } from 'react';
import { Filter, Search } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import ChamadoTable from '../components/ChamadoTable';
import Header from '../components/Header';

function Chamados({ chamados, onMenuClick }) {
  const [parametros] = useSearchParams();
  const [busca, setBusca] = useState(parametros.get('busca') ?? '');
  const [status, setStatus] = useState('');
  const [prioridade, setPrioridade] = useState('');
  const [categoria, setCategoria] = useState('');
  const [mostrarTodos, setMostrarTodos] = useState(false);

  const chamadosFiltrados = useMemo(() => {
    const termo = busca.toLowerCase();
    return chamados.filter((chamado) =>
      (!termo || chamado.titulo.toLowerCase().includes(termo) || String(chamado.id).includes(termo))
      && (!status || chamado.status === status)
      && (!prioridade || chamado.prioridade === prioridade)
      && (!categoria || chamado.categoria === categoria),
    );
  }, [busca, chamados, prioridade, status, categoria]);

  return (
    <>
      <Header
        title="Chamados"
        subtitle="Gerencie e acompanhe todos os chamados do sistema"
        onMenuClick={onMenuClick}
      />
      <div className="page-content tickets-page">
        <section className="filter-bar">
          <label className="filter-select">
            <span>Status</span>
            <select value={status} onChange={(event) => setStatus(event.target.value)}>
              <option value="">Todos</option>
              <option>Aberto</option>
              <option>Em Atendimento</option>
              <option>Resolvido</option>
              <option>Fechado</option>
            </select>
          </label>
          <label className="filter-select">
            <span>Prioridade</span>
            <select value={prioridade} onChange={(event) => setPrioridade(event.target.value)}>
              <option value="">Todas</option>
              <option>Alta</option>
              <option>Média</option>
              <option>Baixa</option>
            </select>
          </label>
          <label className="filter-select">
            <span>Categoria</span>
            <select value={categoria} onChange={(event) => setCategoria(event.target.value)}>
              <option value="">Todas</option>
              <option>Hardware</option>
              <option>Software</option>
              <option>Rede</option>
              <option>Acesso</option>
            </select>
          </label>
          <label className="filter-search">
            <Search />
            <input value={busca} onChange={(event) => setBusca(event.target.value)} placeholder="Buscar chamados..." />
          </label>
          <button type="button" className="outline-button more-filter" onClick={() => setMostrarTodos((mostrar) => !mostrar)}><Filter /> {mostrarTodos ? 'Limpar filtros' : 'Mais filtros'}</button>
        </section>
        {mostrarTodos && (
          <div className="filter-hint">
            <span>Filtros ativos: {status || 'todos os status'}, {prioridade || 'todas as prioridades'}, {categoria || 'todas as categorias'}.</span>
            <button type="button" onClick={() => { setStatus(''); setPrioridade(''); setCategoria(''); setBusca(''); }}>Limpar tudo</button>
          </div>
        )}
        <ChamadoTable chamados={chamadosFiltrados} showPagination />
      </div>
    </>
  );
}

export default Chamados;
