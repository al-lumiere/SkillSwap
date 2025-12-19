import { ButtonUIProps } from './types';
import styles from './button.module.css';

export const ButtonUI = ({ text, icon, variant = 'primary', disabled = false, onClick }: ButtonUIProps) => {
  const className = [styles.button, styles[variant], disabled ? styles.isDisabled : ''].filter(Boolean).join(' ');

  return (
    <button type="button" disabled={disabled} onClick={onClick} className={className}>
      {children}
    </button>
  );
};
