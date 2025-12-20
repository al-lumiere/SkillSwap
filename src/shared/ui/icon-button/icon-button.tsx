import { FC } from 'react';
import styles from './icon-button.module.css';
import { TIconButtonUIProps } from './type';

export const IconButtonUI: FC<TIconButtonUIProps> = ({ children, onClick, isActive = false }) => (
  <button type="button" className={styles.button} onClick={onClick} aria-pressed={isActive}>
    {children}
  </button>
);
