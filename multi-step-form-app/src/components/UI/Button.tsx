import React from "react";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  type = "button",
  className,
}) => {
  return (
    <button onClick={onClick} type={type} className={`btn ${className}`}>
      {children}
    </button>
  );
};

export default Button;
