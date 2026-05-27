function StatusBadge({ status }) {
  const classe = status.toLowerCase().replaceAll(' ', '-');
  return (
    <span className={`badge status-${classe}`}>
      {status !== 'Fechado' && <i className="badge-dot" />}
      {status}
    </span>
  );
}

export default StatusBadge;
