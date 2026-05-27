import { CheckCircle2, FileText, Headphones, Inbox, Lock } from 'lucide-react';

const icons = {
  total: FileText,
  aberto: Inbox,
  atendimento: Headphones,
  resolvido: CheckCircle2,
  fechado: Lock,
};

function StatCard({ titulo, valor, detalhe, tipo }) {
  const Icon = icons[tipo];

  return (
    <article className={`stat-card ${tipo}`}>
      <div>
        <p>{titulo}</p>
        <strong>{valor}</strong>
        <small>{detalhe}</small>
      </div>
      <span className="stat-icon">
        <Icon />
      </span>
    </article>
  );
}

export default StatCard;
