import { FC } from 'react';
import CrossIcon from '@icons/cross-icon';
import SearchIcon from '@icons/search-icon';
import { TSearchInputUIProps } from './type';
import styles from './search.module.css';

export const SearchUI: FC<TSearchInputUIProps> = ({ placeholder, value, onChange, onClear }) => (
  <div className={styles.wrapper}>
    <SearchIcon className={styles.searchIcon} />
    <input
      className={styles.input}
      type="text"
      name="search"
      autoComplete="off"
      placeholder={placeholder || 'Искать навык'}
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
      }}
    />
    {!!value && (
      <CrossIcon className={styles.close} role="button" aria-label="Очистить поиск" onClick={() => onClear?.()} />
    )}
  </div>
);
