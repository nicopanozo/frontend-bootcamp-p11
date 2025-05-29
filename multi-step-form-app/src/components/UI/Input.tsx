import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const Input: React.FC<InputProps> = ({ label, ...props }) => {
  return (
    <div className="input-container">
      <label>
        {label}
        <input {...props} />
      </label>
    </div>
  );
};

export default Input;
