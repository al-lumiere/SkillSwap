import { FC } from 'react';
import { PopoverUI } from '@ui/popover';
import { SelectUI } from '@ui/select';
import type { SingleselectUIProps } from './type';
import styles from './regisration-singleselect.module.css';

export const SingleselectUI: FC<SingleselectUIProps> = ({
  label,
  placeholder,
  value,
  isOpen,
  handleToggle,
  onClose,
  placement = 'bottom-start',
  offset = -1,
  matchWidth = true,
  maxWidth = null,
  options,
  selectedId,
  onSelect,
}) => (
  <PopoverUI
    isOpen={isOpen}
    onClose={onClose}
    placement={placement}
    offset={offset}
    matchWidth={matchWidth}
    maxWidth={maxWidth}
    anchor={
      <SelectUI isOpen={isOpen} label={label} placeholder={placeholder} value={value} handleToggle={handleToggle} />
    }
  >
    <ul className={styles.list}>
      {options.map(({ id, label: optionLabel }) => (
        <li key={id}>
          <button
            type="button"
            className={[styles.list_item, selectedId === id && styles.selected].filter(Boolean).join(' ')}
            onClick={() => onSelect(id)}
          >
            {optionLabel}
          </button>
        </li>
      ))}
    </ul>
  </PopoverUI>
);
