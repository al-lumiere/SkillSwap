import type { FC, ChangeEvent } from 'react';
import { useId } from 'react';
import type { TTextAreaUIProps } from './type';
import styles from './text-area.module.css';

export const TextAreaUI: FC<TTextAreaUIProps> = ({
  label,
  name,
  icon,
  value = '',
  onChange,
  placeholder,
  required,
  helperText,
  errorText,
  hasError,
  className,
  disabled,
  id,
  rows = 1,
}) => {
  const reactId = useId();
  const textareaId = id ?? `textarea-ui-${reactId}`;

  const isError = Boolean(errorText) || Boolean(hasError);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
    onChange?.(e);
  };

  return (
    <div className={[styles.container, className].filter(Boolean).join(' ')}>
      {label && (
        <label htmlFor={textareaId}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}

      <div
        className={[styles.field, isError && styles.fieldError, disabled && styles.fieldDisabled]
          .filter(Boolean)
          .join(' ')}
      >
        <div className={styles.formGroup}>
          <textarea
            id={textareaId}
            name={name}
            className={styles.textarea}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            required={required}
            disabled={disabled}
            rows={rows}
            aria-invalid={isError}
          />

          {icon && <span className={styles.icon}>{icon}</span>}
        </div>
      </div>

      {errorText ? (
        <p className={[styles.helperText, styles.errorText].join(' ')}>{errorText}</p>
      ) : (
        helperText && <p className={styles.helperText}>{helperText}</p>
      )}
    </div>
  );
};
