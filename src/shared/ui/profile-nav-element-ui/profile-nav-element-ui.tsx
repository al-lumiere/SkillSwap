import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './profile-nav-element-ui.module.css';
import { ProfileNavElementUIProps } from './type';

export const ProfileNavElementUI: FC<ProfileNavElementUIProps> = ({ text, icon, to, end = false }) => (
  <NavLink
    to={to}
    end={end}
    className={({ isActive }) => [styles.element, isActive && styles.isActive].filter(Boolean).join(' ')}
  >
    <span className={styles.icon}>{icon}</span>
    <span className={styles.label}>{text}</span>
  </NavLink>
);
