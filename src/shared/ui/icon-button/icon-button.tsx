import { FC } from 'react';
import styles from './icon-button.module.css';
import { TIconButtonProps } from './type';

export const IconButtonUI: FC<TIconButtonProps> = ({ children, onClick }) => (
  <button type="button" className={styles.button} onClick={onClick}>
    {children}
  </button>
);
