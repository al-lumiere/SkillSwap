import { PopoverUI } from '@ui/popover';
import { SelectUI } from '@ui/select';
import type { SingleselectUIProps } from './type';
import styles from './regisration-singleselect.module.css';
import popoverStyles from '../../shared/ui/popover/popover.module.css';

export const SingleselectUI = <TId extends string | number>({
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
  selectedId,
  onSelect,
  disabled = false,
  errorMessage = '',
}: SingleselectUIProps<TId>) => (
  <>
    <PopoverUI
      isOpen={disabled ? false : isOpen}
      onClose={onClose}
      placement={placement}
      offset={offset}
      matchWidth={matchWidth}
      maxWidth={maxWidth}
      popoverClassName={popoverStyles.popoverJoined}
      anchor={
        <SelectUI
          isOpen={disabled ? false : isOpen}
          label={label}
          placeholder={placeholder}
          value={value}
          handleToggle={handleToggle}
          disabled={disabled}
          hasError={!!errorMessage}
        />
      }
    >
      <ul className={styles.list}>
        {options.map(({ id, label: optionLabel }) => (
          <li key={String(id)}>
            <button
              type="button"
              className={[styles.list_item, selectedId === id && styles.selected, disabled && styles.list_itemDisabled]
                .filter(Boolean)
                .join(' ')}
              onClick={() => {
                if (disabled) return;
                onSelect(id);
              }}
              disabled={disabled}
            >
              {optionLabel}
            </button>
          </li>
        ))}
      </ul>
    </PopoverUI>
    {errorMessage && <span className={styles.error}>{errorMessage}</span>}
  </>
);
