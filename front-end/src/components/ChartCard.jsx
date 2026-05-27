function ChartCard({ title, children, footer, className = '' }) {
  return (
    <article className={`chart-card ${className}`.trim()}>
      <h2>{title}</h2>
      {children}
      {footer && <footer className="chart-footer">{footer}</footer>}
    </article>
  );
}

export default ChartCard;
