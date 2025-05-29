import React from "react";

interface SelectProps {
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  label: string;
  required?: boolean;
}

const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  label,
  required,
}) => {
  return (
    <div className="select-container">
      <label>
        {label}
        {required && <span className="required">*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
