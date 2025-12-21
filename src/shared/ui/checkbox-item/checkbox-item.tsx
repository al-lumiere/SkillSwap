import { FC, useId } from 'react';
import CheckboxEmptyIcon from '@icons/checkbox-empty';
import CheckboxDoneIcon from '@icons/checkbox-done';
import { TCheckboxItemUIProps } from './type';
import styles from './checkbox-item.module.css';

export const CheckboxItemUI: FC<TCheckboxItemUIProps> = ({ label, checked = false, onChange }) => {
  const inputId = useId();
  return (
    <label htmlFor={inputId} className={styles.wrapper}>
      <input id={inputId} type="checkbox" checked={checked} onChange={onChange} className="visually-hidden" />
      <div className={`${styles.checkbox} ${checked ? styles.checkboxDone : styles.checkboxEmpty}`} aria-hidden>
        {checked ? <CheckboxDoneIcon /> : <CheckboxEmptyIcon />}
      </div>
      <span className={styles.label}>{label}</span>
    </label>
  );
};
