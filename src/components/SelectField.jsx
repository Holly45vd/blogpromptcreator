function SelectField({
  label,
  name,
  value,
  onChange,
  options = [],
  required = false,
  error,
  description,
}) {
  return (
    <div className={`field-card ${error ? "field-card--error" : ""}`}>
      <label className="field-card__label" htmlFor={name}>
        {label}
        {required && <span className="field-card__required"> *</span>}
      </label>

      {description && <p className="field-card__description">{description}</p>}

      <select
        id={name}
        name={name}
        value={value ?? ""}
        onChange={onChange}
        className="field-card__select"
      >
        <option value="">선택해주세요</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      {error && <p className="field-card__error">{error}</p>}
    </div>
  );
}

export default SelectField;