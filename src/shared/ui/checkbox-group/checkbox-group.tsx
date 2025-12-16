import { FC } from 'react';
import { TCheckboxGroupProps } from './type';
import styles from './checkbox-group.module.css';
import ChevronDownIcon from '../../assets/icons/chevron-down';
import ChevronUpIcon from '../../assets/icons/chevron-up';
import CheckboxEmptyIcon from '../../assets/icons/checkbox-empty';
import CheckboxRemoveIcon from '../../assets/icons/checkbox-remove';

export const CheckboxGroupUI: FC<TCheckboxGroupProps> = ({ label, expanded = false, onToggleExpand, children }) => (
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
