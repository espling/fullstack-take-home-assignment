import React, { ReactNode } from "react";
import styles from "./RadioGroup.module.css";

interface RadioGroupProps {
  children: ReactNode;
  legend: string;
}

const RadioGroup: React.FC<RadioGroupProps> = ({ children, legend }) => {
  return (
    <fieldset className={styles.radioGroupFieldset}>
      <legend className={styles.radioGroupLegend}>{legend}</legend>
      {children}
    </fieldset>
  );
};

export default RadioGroup;
