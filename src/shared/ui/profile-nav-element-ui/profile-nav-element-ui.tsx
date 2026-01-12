import { FC } from 'react';
import styles from './profile-nav-element-ui.module.css';
import { ProfileNavElementUIProps } from './type';

export const ProfileNavElementUI: FC<ProfileNavElementUIProps> = ({ text, icon, onClick, isActive = false }) => (
  <button className={`${styles.element} ${isActive ? styles.isActive : ''}`} type="button" onClick={onClick}>
    <span className={styles.icon}>{icon}</span>
    <span className={styles.label}>{text}</span>
  </button>
);
