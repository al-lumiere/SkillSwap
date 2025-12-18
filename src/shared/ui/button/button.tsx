import { ButtonProps } from './types';
import styles from './button.module.css';

export const Button = ({ variant = 'primary', disabled = false, onClick, children }: ButtonProps) => {
  const className = [styles.button, styles[variant], disabled ? styles.isDisabled : ''].filter(Boolean).join(' ');

  return (
    <button type="button" disabled={disabled} onClick={onClick} className={className}>
      {children}
    </button>
  );
};
