function FormCard({ title, subtitle, children, className = '', icon: Icon }) {
  return (
    <section className={`form-card ${className}`.trim()}>
      <div className="form-card-heading">
        {Icon && <span className="form-title-icon"><Icon /></span>}
        <div>
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </div>
      </div>
      {children}
    </section>
  );
}

export default FormCard;
