function InputField({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  error,
  description,
  example,
}) {
  return (
    <div className={`field-card ${error ? "field-card--error" : ""}`}>
      <label className="field-card__label" htmlFor={name}>
        {label}
        {required && <span className="field-card__required"> *</span>}
      </label>

      {description && <p className="field-card__description">{description}</p>}

      <input
        id={name}
        name={name}
        type="text"
        value={value ?? ""}
        onChange={onChange}
        placeholder={placeholder}
        className="field-card__input"
      />

      {example && <p className="field-card__example">예시: {example}</p>}
      {error && <p className="field-card__error">{error}</p>}
    </div>
  );
}

export default InputField;