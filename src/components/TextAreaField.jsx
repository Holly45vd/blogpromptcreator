function TextAreaField({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  error,
  description,
  rows = 4,
}) {
  return (
    <div className={`field-card ${error ? "field-card--error" : ""}`}>
      <label className="field-card__label" htmlFor={name}>
        {label}
        {required && <span className="field-card__required"> *</span>}
      </label>

      {description && <p className="field-card__description">{description}</p>}

      <textarea
        id={name}
        name={name}
        value={value ?? ""}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        className="field-card__textarea"
      />

      {error && <p className="field-card__error">{error}</p>}
    </div>
  );
}

export default TextAreaField;