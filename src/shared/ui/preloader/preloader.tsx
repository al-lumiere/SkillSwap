/* eslint-disable react/require-default-props */
import styles from './preloader.module.css';

type PreloaderProps = {
  variant?: 'inline' | 'overlay';
};

export const Preloader = ({ variant = 'inline' }: PreloaderProps) => (
  <div className={`${styles.preloader} ${variant === 'overlay' ? styles.overlay : ''}`}>
    <div className={styles.preloader_circle} />
  </div>
);
