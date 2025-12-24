import { FC } from 'react';
import styles from './text-tag.module.css';
import { TTextTagUIProps } from './type';

export const TextTagUI: FC<TTextTagUIProps> = ({ label, bgColor }) => (
  <div className={styles.tag} style={{ backgroundColor: bgColor }}>
    <span className={styles.text}>{label}</span>
  </div>
);
