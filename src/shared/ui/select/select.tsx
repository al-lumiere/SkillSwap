import ChevronDownIcon from '@icons/chevron-down';
import ChevronUpIcon from '@icons/chevron-up';
import { FC } from 'react';
import { SelectUIProps } from './type';
import styles from './select.module.css';

export const SelectUI: FC<SelectUIProps> = ({ label, placeholder, value, isOpen, handleToggle }) => (
  <div className={styles.wrapper}>
    <span className={styles.label}>{label}</span>
    <button type="button" className={styles.field} onClick={handleToggle}>
      {value ? (
        <span className={styles.value}>{value}</span>
      ) : (
        <span className={styles.placeholder}>{placeholder}</span>
      )}
      {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
    </button>
  </div>
);
