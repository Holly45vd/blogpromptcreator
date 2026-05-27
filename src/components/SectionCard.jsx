function SectionCard({ title, description, children }) {
  return (
    <section className="section-card">
      <div className="section-card__header">
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>

      <div className="section-card__body">{children}</div>
    </section>
  );
}

export default SectionCard;