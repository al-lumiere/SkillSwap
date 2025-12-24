import type { ChangeEvent, FC } from 'react';
import { useId, useMemo, useState } from 'react';
import EyeIcon from '@icons/eye-icon';
import EyeOffIcon from '@icons/eye-off-icon';
import { TInputUIProps } from './type';
import styles from './input-ui.module.css';

const cn = (...classes: Array<string | undefined | false>) => classes.filter(Boolean).join(' ');

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
  const inputId = useMemo(() => id || `input-ui-${reactId}`, [id, reactId]);

  const isPassword = type === 'password';
  const shouldShowPasswordToggle = isPassword && !icon && showPasswordToggle;
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  let inputType = type;
  if (shouldShowPasswordToggle) {
    inputType = isPasswordVisible ? 'text' : 'password';
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e);
  };

  return (
    <div className={cn(styles.container, className)}>
      {!!label && (
        <label className={styles.label} htmlFor={inputId}>
          {label}
          {!!required && <span className={styles.required}>*</span>}
        </label>
      )}

      <div
        className={cn(
          styles.field,
          !!errorText && styles.fieldError,
          !!disabled && styles.fieldDisabled,
          (!!icon || shouldShowPasswordToggle) && styles.fieldWithIcon,
        )}
      >
        <input
          id={inputId}
          name={name}
          type={inputType}
          className={styles.input}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          autoComplete="off"
          aria-invalid={!!errorText}
          disabled={disabled}
        />

        {!!icon && !shouldShowPasswordToggle && <span className={styles.iconButton}>{icon}</span>}

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

      {errorText ? (
        <p className={cn(styles.helperText, styles.errorText)}>{errorText}</p>
      ) : (
        !!helperText && <p className={styles.helperText}>{helperText}</p>
      )}
    </div>
  );
};
