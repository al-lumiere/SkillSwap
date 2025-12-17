import { NavLink } from 'react-router-dom';
import styles from './logo.module.css';
import type { LogoProps } from './type';

export const Logo = ({ to = '/' }: LogoProps) => (
  <NavLink to={to} className={({ isActive }) => `${styles.logo} ${isActive ? styles.active : ''}`}>
    <img src="/logo.svg" alt="SkillSwap logo" className={styles.icon} />
    <span className={styles.text}>SkillSwap</span>
  </NavLink>
);
