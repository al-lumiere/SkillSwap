import { FC } from 'react';
import styles from './show-more-button.module.css';
import { TShowMoreButtonUIProps } from './type';
import ChevronUpIcon from '../../assets/icons/chevron-up';
import ChevronDownIcon from '../../assets/icons/chevron-down';

export const ShowMoreButtonUI: FC<TShowMoreButtonUIProps> = ({ label, onClick, open }) => (
  <button type="button" className={styles.button} onClick={onClick}>
    <span className={styles.label}>{label}</span>
    {open ? <ChevronUpIcon className={styles.icon} /> : <ChevronDownIcon className={styles.icon} />}
  </button>
);
