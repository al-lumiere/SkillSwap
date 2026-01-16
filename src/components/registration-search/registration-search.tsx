import { FC, useMemo } from 'react';
import { PopoverUI } from '@ui/popover';
import { SelectUI } from '@ui/select';
import { SearchSelectUIProps } from './type';
import styles from './registration-search.module.css';
import popoverStyles from '../../shared/ui/popover/popover.module.css';

export const SearchSelectUI: FC<SearchSelectUIProps> = ({
  label,
  placeholder,
  value,
  isOpen,
  handleToggle,
  onClose,
  placement = 'bottom-start',
  offset = 0,
  matchWidth = true,
  maxWidth = null,
  options,
  query = '',
  handleQueryChange,
  handleClear,
  onSelect,
  errorMessage = '',
}) => {
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return options.filter((c) => c.name.toLowerCase().includes(q));
  }, [options, query]);

  return (
    <div>
      <PopoverUI
        isOpen={isOpen}
        onClose={onClose}
        placement={placement}
        offset={offset}
        matchWidth={matchWidth}
        maxWidth={maxWidth}
        popoverClassName={popoverStyles.popoverJoined}
        hasError={!!errorMessage}
        anchor={
          <SelectUI
            isOpen={isOpen}
            label={label}
            placeholder={placeholder}
            value={value}
            handleToggle={handleToggle}
            variant="search"
            query={query}
            handleQueryChange={handleQueryChange}
            handleClear={handleClear}
            hasError={!!errorMessage}
          />
        }
      >
        {query.length === 0 && <span className={styles.hint}>Начните вводить текст</span>}
        {query.length > 0 &&
          (filtered.length > 0 ? (
            <ul className={styles.list}>
              {filtered.map((city) => (
                <li key={city.id}>
                  <button type="button" className={styles.list_item} onClick={() => onSelect(city)}>
                    {city.name}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <span className={styles.hint}>Мы не нашли такого города 😭</span>
          ))}
      </PopoverUI>
      {errorMessage && <span className={styles.error}>{errorMessage}</span>}
    </div>
  );
};
