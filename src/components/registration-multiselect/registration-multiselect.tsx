import { FC } from 'react';
import { PopoverUI } from '@ui/popover';
import { SelectUI } from '@ui/select';
import { CheckboxItemUI } from '@ui/checkbox-item';
import { MultiselectUIProps } from './type';
import styles from './registration-multiselect.module.css';
import popoverStyles from '../../shared/ui/popover/popover.module.css';

export const MultiselectUI: FC<MultiselectUIProps> = ({
  label,
  placeholder,
  value,
  handleToggle,
  isOpen,
  onClose,
  placement = 'bottom-start',
  offset = 0,
  matchWidth = true,
  maxWidth = null,
  options,
  selectedIds,
  onOptionChange,
}) => (
  <PopoverUI
    isOpen={isOpen}
    onClose={onClose}
    placement={placement}
    offset={offset}
    matchWidth={matchWidth}
    maxWidth={maxWidth}
    popoverClassName={popoverStyles.popoverJoined}
    anchor={
      <SelectUI label={label} placeholder={placeholder} value={value} isOpen={isOpen} handleToggle={handleToggle} />
    }
  >
    <fieldset className={styles.wrapper}>
      {options.map((opt) => (
        <CheckboxItemUI
          key={opt.id}
          label={opt.label}
          checked={selectedIds.includes(opt.id)}
          onChange={(e) => onOptionChange(opt.id, e.currentTarget.checked)}
        />
      ))}
    </fieldset>
  </PopoverUI>
);
