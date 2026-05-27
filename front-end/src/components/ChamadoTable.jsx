import { ArrowRight, MoreHorizontal } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import CardChamado from './CardChamado';
import CategoryLabel from './CategoryLabel';
import Pagination from './Pagination';
import PersonAvatar from './PersonAvatar';
import PriorityBadge from './PriorityBadge';
import StatusBadge from './StatusBadge';

function ChamadoTable({ chamados, recente = false, showPagination = false }) {
  const navigate = useNavigate();

  function abrirChamado(event, id) {
    if (event.target.closest('button, a')) return;
    navigate(`/chamados/${id}`);
  }

  function tratarTecla(event, id) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      navigate(`/chamados/${id}`);
    }
  }

  return (
    <section className={`ticket-panel ${recente ? 'recent-panel' : 'full-ticket-panel'}`}>
      {recente && <h2>Chamados Recentes</h2>}
      <div className="table-wrapper">
        <table className="tickets-table">
          <thead>
            <tr>
              <th>{recente ? '#' : 'ID'}</th>
              <th>Título</th>
              <th>Categoria</th>
              <th>Prioridade</th>
              <th>Status</th>
              <th>Técnico</th>
              <th>Atualizado em</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {chamados.map((chamado) => (
              <tr
                key={chamado.id}
                className="clickable-row"
                onClick={(event) => abrirChamado(event, chamado.id)}
                onKeyDown={(event) => tratarTecla(event, chamado.id)}
                tabIndex={0}
              >
                <td>
                  <Link className="ticket-id" to={`/chamados/${chamado.id}`}>#{chamado.id}</Link>
                </td>
                <td>
                  <Link className="ticket-title" to={`/chamados/${chamado.id}`}>{chamado.titulo}</Link>
                </td>
                <td><CategoryLabel category={chamado.categoria} /></td>
                <td><PriorityBadge prioridade={chamado.prioridade} /></td>
                <td><StatusBadge status={chamado.status} /></td>
                <td>
                  <span className="assignee">
                    <PersonAvatar name={chamado.tecnico} size="small" />
                    {chamado.tecnico}
                  </span>
                </td>
                <td>{chamado.atualizadoEm}</td>
                <td className="actions">
                  <button type="button" className="icon-action" onClick={() => navigate(`/chamados/${chamado.id}`)} aria-label={`Abrir chamado ${chamado.id}`}>
                    <MoreHorizontal />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mobile-ticket-list">
        {chamados.map((chamado) => <CardChamado key={chamado.id} chamado={chamado} />)}
      </div>
      {recente && (
        <Link className="table-more" to="/chamados">
          Ver todos os chamados <ArrowRight size={16} />
        </Link>
      )}
      {showPagination && (
        <Pagination
          summary={`Mostrando ${chamados.length ? 1 : 0} a ${chamados.length} de ${chamados.length} chamados`}
          pages={['1']}
        />
      )}
    </section>
  );
}

export default ChamadoTable;
