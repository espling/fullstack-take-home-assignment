import React, { ComponentPropsWithoutRef } from "react";
import styles from "./Button.module.css";

type ButtonSize = "small" | "medium" | "large";

type ButtonVariant = "primary" | "secondary";

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  label: string;
  title: string;
  onClick: () => void;
  size?: ButtonSize;
  variant?: ButtonVariant;
  disabled?: boolean;
  className?: string;
}
const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  size = "medium",
  variant = "primary",
  disabled = false,
  className = "",
  ...props
}) => {
  const btnVariant = `btn-${variant}` as keyof typeof styles;
  const btnSize = `btn-${size}` as keyof typeof styles;
  return (
    <button
      {...props}
      className={`${styles[btnVariant]} ${styles[btnSize]} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
