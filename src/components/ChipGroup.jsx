function ChipGroup({
  label,
  name,
  selectedValues = [],
  onChange,
  options = [],
  description,
}) {
  const safeSelectedValues = Array.isArray(selectedValues) ? selectedValues : [];

  const handleToggle = (option) => {
    const nextValues = safeSelectedValues.includes(option)
      ? safeSelectedValues.filter((value) => value !== option)
      : [...safeSelectedValues, option];

    onChange(name, nextValues);
  };

  return (
    <div className="field-card">
      <div className="field-card__label">{label}</div>

      {description && <p className="field-card__description">{description}</p>}

      <div className="chip-group">
        {options.map((option) => {
          const isSelected = safeSelectedValues.includes(option);

          return (
            <button
              key={option}
              type="button"
              onClick={() => handleToggle(option)}
              className={`chip-group__item ${isSelected ? "chip-group__item--selected" : ""}`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ChipGroup;