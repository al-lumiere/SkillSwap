import { Link } from 'react-router-dom';
import styles from './logo.module.css';

import LogoIcon from '../../assets/icons/logo-icon';

export const Logo = () => (
  <Link to="/" className={styles.logo}>
    <LogoIcon className={styles.icon} />
    <span className={styles.text}>SkillSwap</span>
  </Link>
);
