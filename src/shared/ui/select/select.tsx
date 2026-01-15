import ChevronDownIcon from '@icons/chevron-down';
import ChevronUpIcon from '@icons/chevron-up';
import CrossIcon from '@icons/cross-icon';
import { FC, useEffect, useRef } from 'react';
import { SelectUIProps } from './type';
import styles from './select.module.css';

export const SelectUI: FC<SelectUIProps> = ({
  variant,
  label,
  placeholder,
  value,
  isOpen,
  handleToggle,
  query = '',
  handleQueryChange,
  handleClear,
  disabled = false,
}) => {
  const showClear = variant === 'search' && isOpen && query.length > 0;

  const showSearchInput = variant === 'search' && isOpen;

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (variant === 'search' && isOpen) {
      inputRef.current?.focus();
    }
  }, [variant, isOpen]);

  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>{label}</span>
      {showSearchInput ? (
        <div className={styles.searchWrapper}>
          <input
            ref={inputRef}
            className={[styles.searchField, isOpen && styles.open, disabled && styles.disabled]
              .filter(Boolean)
              .join(' ')}
            value={query}
            onChange={(e) => handleQueryChange?.(e.target.value)}
            disabled={disabled}
          />
          {showClear && (
            <button
              className={styles.clearButton}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={(e) => {
                e.stopPropagation();
                handleClear?.();
              }}
              aria-label="Очистить поле ввода"
              disabled={disabled}
            >
              <CrossIcon />
            </button>
          )}
        </div>
      ) : (
        <button
          type="button"
          className={[styles.field, isOpen && styles.open, disabled && styles.fieldDisabled].filter(Boolean).join(' ')}
          onClick={disabled ? undefined : handleToggle}
          disabled={disabled}
          aria-disabled={disabled}
        >
          {value ? (
            <span className={styles.value}>{value}</span>
          ) : (
            <span className={styles.placeholder}>{placeholder}</span>
          )}
          {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </button>
      )}
    </div>
  );
};
