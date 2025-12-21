import { FC } from 'react';
import { TCheckboxFilterContainerUIProps } from './type';
import styles from './checkbox-filter-container.module.css';

export const CheckboxFilterContainerUI: FC<TCheckboxFilterContainerUIProps> = ({ label, children }) => (
  <fieldset className={styles.wrapper}>
    <legend className={styles.label}>{label}</legend>
    <div className={styles.children}>{children}</div>
  </fieldset>
);
