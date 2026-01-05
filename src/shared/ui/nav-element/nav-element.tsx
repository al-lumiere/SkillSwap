import { FC } from 'react';
import styles from './nav-element.module.css';
import { TNavElementUIProps } from './type';

export const NavElementUI: FC<TNavElementUIProps> = ({ text, icon, onClick }) => (
  <button type="button" className={styles.container} onClick={onClick}>
    <span className={styles.text}>{text}</span>
    {icon && <span className={styles.icon}>{icon}</span>}
  </button>
);
