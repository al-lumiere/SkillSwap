import { FC } from 'react';
import styles from './text-tag.module.css';
import { TTextTagUIProps } from './type';

export const TextTagUI: FC<TTextTagUIProps> = ({ label, bgColor }) => (
  <span className={styles.tag} style={{ backgroundColor: bgColor }}>
    {label}
  </span>
);
