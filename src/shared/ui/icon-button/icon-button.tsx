import { FC } from 'react';
import styles from './icon-button.module.css';
import { TIconButtonProps } from './type';

export const IconButtonUI: FC<TIconButtonProps> = ({ children, onClick, isActive = false }) => (
  <button type="button" className={styles.button} onClick={onClick} aria-pressed={isActive}>
    {children}
  </button>
);
