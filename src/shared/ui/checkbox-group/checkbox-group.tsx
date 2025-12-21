import { FC } from 'react';
import ChevronDownIcon from '@icons/chevron-down';
import ChevronUpIcon from '@icons/chevron-up';
import CheckboxEmptyIcon from '@icons/checkbox-empty';
import CheckboxRemoveIcon from '@icons/checkbox-remove';
import styles from './checkbox-group.module.css';
import { TCheckboxListUIProps } from './type';

export const CheckboxListUI: FC<TCheckboxListUIProps> = ({ label, expanded = false, onToggleExpand, children }) => (
  <details className={styles.wrapper} open={expanded}>
    <summary
      className={styles.summary}
      onClick={(e) => {
        e.preventDefault();
        onToggleExpand?.();
      }}
    >
      {expanded ? (
        <CheckboxRemoveIcon className={`${styles.checkbox} ${styles.checkboxRemove}`} />
      ) : (
        <CheckboxEmptyIcon className={`${styles.checkbox} ${styles.checkboxEmpty}`} />
      )}
      <span className={styles.label}>{label}</span>
      {expanded ? (
        <ChevronUpIcon className={styles.chevron} aria-hidden />
      ) : (
        <ChevronDownIcon className={styles.chevron} aria-hidden />
      )}
    </summary>
    <div className={styles.content}>{children}</div>
  </details>
);
