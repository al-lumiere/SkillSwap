import { FC } from 'react';
import { GenderId } from '@features/select-gender/constants';
import styles from './gender-list.module.css';

type GenderListUIProps = {
  options: { id: GenderId; label: string }[];
  selectedValueId: GenderId;
  onSelect: (id: GenderId) => void;
};

export const GenderListUI: FC<GenderListUIProps> = ({ options, selectedValueId, onSelect }) => (
  <ul className={styles.list}>
    {options.map(({ id, label }) => (
      <li key={id}>
        <button
          type="button"
          className={[styles.list_item, selectedValueId === id && styles.selected].filter(Boolean).join(' ')}
          onClick={() => onSelect(id)}
        >
          {label}
        </button>
      </li>
    ))}
  </ul>
);
