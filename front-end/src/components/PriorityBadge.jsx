function PriorityBadge({ prioridade }) {
  const classe = prioridade.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return <span className={`badge priority-${classe}`}>{prioridade}</span>;
}

export default PriorityBadge;
