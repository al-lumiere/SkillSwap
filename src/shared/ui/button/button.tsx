import { ButtonProps } from './types';
import styles from './button.module.css';

export const Button = ({ text, icon, variant = 'primary', disabled = false, onClick }: ButtonProps) => {
  const className = [styles.button, styles[variant], disabled ? styles.isDisabled : ''].filter(Boolean).join(' ');

  return (
    <button type="button" disabled={disabled} onClick={onClick} className={className}>
      {text && <span>{text}</span>}
      {icon && <span className={styles.icon}>{icon}</span>}
    </button>
  );
};
