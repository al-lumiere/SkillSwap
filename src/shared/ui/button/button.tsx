import { ButtonUIProps } from './types';
import styles from './button.module.css';

export const ButtonUI = ({
  children,
  variant = 'primary',
  disabled = false,
  onClick,
  padding,
  iconLeft,
  iconRight,
}: ButtonUIProps) => {
  const className = [styles.button, styles[variant], disabled ? styles.isDisabled : ''].filter(Boolean).join(' ');
  const style = padding !== undefined ? { padding } : undefined;

  return (
    <button type="button" disabled={disabled} onClick={onClick} className={className} style={style}>
      {iconLeft && <span className={styles.icon}>{iconLeft}</span>}
      {children}
      {iconRight && <span className={styles.icon}>{iconRight}</span>}
    </button>
  );
};
