import { FC, memo } from 'react';
import ChevronDownIcon from '@icons/chevron-down';
import ChevronUpIcon from '@icons/chevron-up';
import CheckboxEmptyIcon from '@icons/checkbox-empty';
import CheckboxRemoveIcon from '@icons/checkbox-remove';
import styles from './checkbox-list.module.css';
import { TCheckboxListProps } from './type';

export const CheckboxListUI: FC<TCheckboxListProps> = memo(
  ({ label, expanded = false, onToggleExpand, hasSelected = false, children }) => (
    <details
      className={styles.wrapper}
      open={expanded}
      onToggle={(e) => {
        const isOpen = e.currentTarget.open;
        if (isOpen !== expanded) {
          onToggleExpand?.();
        }
      }}
    >
      <summary className={styles.summary}>
        <div className={styles.checkbox}>
          {hasSelected ? (
            <CheckboxRemoveIcon className={styles.checkboxRemove} />
          ) : (
            <CheckboxEmptyIcon className={styles.checkboxEmpty} />
          )}
        </div>
        <span className={styles.label}>{label}</span>
        <div className={styles.chevron}>{expanded ? <ChevronUpIcon /> : <ChevronDownIcon />}</div>
      </summary>

      <div className={styles.content}>
        <div>{children}</div>
      </div>
    </details>
  ),
);

CheckboxListUI.displayName = 'CheckboxListUI';
