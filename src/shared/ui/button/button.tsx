import { ButtonUIProps } from './types';
import styles from './button.module.css';

export const ButtonUI = ({ children, variant = 'primary', disabled = false, onClick, padding }: ButtonUIProps) => {
  const className = [styles.button, styles[variant], disabled ? styles.isDisabled : ''].filter(Boolean).join(' ');
  const style = padding !== undefined ? { padding } : undefined;

  return (
    <button type="button" disabled={disabled} onClick={onClick} className={className} style={style}>
      {children}
    </button>
  );
};
