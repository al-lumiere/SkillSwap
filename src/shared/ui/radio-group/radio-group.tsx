import React from 'react';
import styles from './radio-group.module.css';
import { RadioGroupUIProps } from './type';

const RadioGroupUI: React.FC<RadioGroupUIProps> = ({ title, options, value, onChange, name }) => (
  <div className={styles.radioGroup}>
    {title && <h2 className={styles.title}>{title}</h2>}
    <div className={styles.optionsList}>
      {options.map((option) => (
        <label key={option.value} className={styles.radioOption} htmlFor={`${name}-${option.value}`}>
          <input
            type="radio"
            id={`${name}-${option.value}`}
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={(e) => onChange(e.target.value)}
            className={styles.radioInput}
          />
          <span className={styles.radioButton} />
          <span className={styles.radioLabel}>{option.label}</span>
        </label>
      ))}
    </div>
  </div>
);

export default RadioGroupUI;
