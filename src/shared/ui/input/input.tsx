import type { FC } from 'react';
import { useId, useState } from 'react';
import EyeIcon from '@icons/eye-icon';
import EyeOffIcon from '@icons/eye-off-icon';
import { TInputUIProps } from './type';
import styles from './input.module.css';

export const InputUI: FC<TInputUIProps> = ({
  label,
  name,
  type = 'text',
  icon,
  value = '',
  onChange,
  placeholder,
  required,
  helperText,
  errorText,
  className,
  disabled,
  id,
  showPasswordToggle = true,
}) => {
  const reactId = useId();
  const inputId = id ?? `input-ui-${reactId}`;

  const shouldShowPasswordToggle = type === 'password' && !icon && showPasswordToggle;
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  let inputType = type;

  if (shouldShowPasswordToggle) {
    inputType = isPasswordVisible ? 'text' : 'password';
  }

  return (
    <div className={[styles.container, className].filter(Boolean).join(' ')}>
      {label && (
        <label className={styles.label} htmlFor={inputId}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}

      <div
        className={[styles.field, errorText && styles.fieldError, disabled && styles.fieldDisabled]
          .filter(Boolean)
          .join(' ')}
      >
        <div className={styles.formGroup}>
          <input
            id={inputId}
            name={name}
            type={inputType}
            className={styles.input}
            placeholder={placeholder}
            value={value}
            required={required}
            onChange={onChange}
            aria-invalid={!!errorText}
            disabled={disabled}
          />

          {icon && !shouldShowPasswordToggle && <span className={styles.iconButton}>{icon}</span>}

          {shouldShowPasswordToggle && (
            <button
              type="button"
              className={styles.iconButton}
              aria-label={isPasswordVisible ? 'Скрыть пароль' : 'Показать пароль'}
              onClick={() => setIsPasswordVisible((prev) => !prev)}
              disabled={disabled}
            >
              {isPasswordVisible ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          )}
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
