import { MoreHorizontal } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import PriorityBadge from './PriorityBadge';
import StatusBadge from './StatusBadge';

function CardChamado({ chamado }) {
  const navigate = useNavigate();

  return (
    <article className="ticket-mobile-card">
      <div className="ticket-mobile-title">
        <Link className="ticket-id" to={`/chamados/${chamado.id}`}>#{chamado.id}</Link>
        <button type="button" className="icon-action" onClick={() => navigate(`/chamados/${chamado.id}`)} aria-label={`Abrir chamado ${chamado.id}`}>
          <MoreHorizontal />
        </button>
      </div>
      <Link className="ticket-title" to={`/chamados/${chamado.id}`}>{chamado.titulo}</Link>
      <p>{chamado.categoria} · {chamado.tecnico}</p>
      <div className="ticket-mobile-meta">
        <PriorityBadge prioridade={chamado.prioridade} />
        <StatusBadge status={chamado.status} />
      </div>
      <small>Atualizado em {chamado.atualizadoEm}</small>
    </article>
  );
}

export default CardChamado;
