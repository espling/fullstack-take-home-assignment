import React, { InputHTMLAttributes } from "react";
import style from "./TextField.module.css";

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  errorMsg?: string;
  required?: boolean;
}

const TextField: React.FC<TextFieldProps> = ({
  id,
  label,
  errorMsg,
  required = false,
  className,
  ...props
}) => {
  const hasError = !!errorMsg;

  return (
    <div className={`${style["text-field-wrapper"]} ${className || ""}`}>
      {label && (
        <label htmlFor={id} className={`${style["text-field-label"]}`}>
          {label} {required && <span aria-hidden="true">*</span>}
        </label>
      )}
      <input
        id={id}
        className={`${style["text-field-input"]} ${
          hasError ? `${style["has-error"]}` : ""
        }`}
        aria-invalid={hasError ? "true" : "false"}
        aria-describedby={hasError ? `${id}-error` : undefined}
        aria-required={required}
        role="textbox"
        {...props}
      />
      {hasError && (
        <span
          id={`${id}-error`}
          className={`${style["text-field-error"]}`}
          role="alert"
        >
          {errorMsg}
        </span>
      )}
    </div>
  );
};

export default TextField;
