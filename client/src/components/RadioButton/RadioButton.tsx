import React, { ChangeEvent } from "react";
import styles from "./RadioButton.module.css";

interface RadioButtonProps {
  id: string;
  name: string;
  value: string;
  checked: boolean;
  labelText: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({
  id,
  name,
  value,
  checked,
  labelText,
  onChange,
}) => {
  return (
    <label className={styles.radioButtonWrappingLabel}>
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className={styles.radioButtonInput}
      />
      <span>{labelText}</span>
    </label>
  );
};

export default RadioButton;
