import { FC } from 'react';
import { TCheckboxFilterContainerProps } from './type';
import styles from './checkbox-filter-container.module.css';

export const CheckboxFilterContainerUI: FC<TCheckboxFilterContainerProps> = ({ label, children }) => (
  <fieldset className={styles.wrapper}>
    <legend className={styles.label}>{label}</legend>
    <div className={styles.children}>{children}</div>
  </fieldset>
);
