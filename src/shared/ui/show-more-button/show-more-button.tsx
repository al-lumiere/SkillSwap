import { FC } from 'react';
import ChevronDownIcon from '@icons/chevron-down';
import ChevronUpIcon from '@icons/chevron-up';
import styles from './show-more-button.module.css';
import { TShowMoreButtonUIProps } from './type';

export const ShowMoreButtonUI: FC<TShowMoreButtonUIProps> = ({ label, onClick, open }) => (
  <button type="button" className={styles.button} onClick={onClick}>
    <span className={styles.label}>{label}</span>
    {open ? <ChevronUpIcon className={styles.icon} /> : <ChevronDownIcon className={styles.icon} />}
  </button>
);
