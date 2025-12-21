import { Link } from 'react-router-dom';
import LogoIcon from '@icons/logo-icon';
import styles from './logo.module.css';

export const LogoUI = () => (
  <Link to="/" className={styles.logo}>
    <LogoIcon className={styles.icon} />
    <span className={styles.text}>SkillSwap</span>
  </Link>
);
