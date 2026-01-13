import type { FC } from 'react';
import { ButtonUIProps } from './types';
import styles from './button.module.css';

export const ButtonUI: FC<ButtonUIProps> = ({
  children,
  variant = 'primary',
  disabled = false,
  onClick,
  isWide = false,
  iconLeft,
  iconRight,
  form,
  type = 'button',
}) => {
  const className = [styles.button, styles[variant], disabled ? styles.isDisabled : ''].filter(Boolean).join(' ');
  const style = isWide ? { width: '100%' } : undefined;

  return (
    <button
      type={type === 'submit' ? 'submit' : 'button'}
      disabled={disabled}
      onClick={onClick}
      className={className}
      style={style}
      form={form}
    >
      {iconLeft && <span className={styles.icon}>{iconLeft}</span>}
      {children}
      {iconRight && <span className={styles.icon}>{iconRight}</span>}
    </button>
  );
};
