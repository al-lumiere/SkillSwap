import { FC } from 'react';
import CrossIcon from '../../assets/icons/cross-icon';
import SearchIcon from '../../assets/icons/search-icon';
import { TSearchInputProps } from './type';
import styles from './search.module.css';

export const SearchUI: FC<TSearchInputProps> = ({ placeholder, value, onChange, onClear }) => (
  <div className={styles.wrapper}>
    <SearchIcon className={styles.searchIcon} />
    <input
      className={styles.input}
      type="text"
      name="search"
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
