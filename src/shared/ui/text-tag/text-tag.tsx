import { FC } from 'react';
import styles from './text-tag.module.css';
import { TTextTagProps } from './type';

export const TextTagUI: FC<TTextTagProps> = ({ label, bgColor }) => (
  <span className={styles.tag} style={{ backgroundColor: bgColor }}>
    {label}
  </span>
);
