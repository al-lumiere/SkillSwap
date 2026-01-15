import type { FC, FormEventHandler } from 'react';
import { Link } from 'react-router-dom';
import { ButtonUI } from '@ui/button';
import GoogleIcon from '@icons/google-icon';
import AppleIcon from '@icons/apple-icon';
import styles from './auth-panel-ui.module.css';
import type { AuthPanelUIProps } from './type';

export const AuthPanelUI: FC<AuthPanelUIProps> = ({
  actionText,
  onSubmit,
  onAction,
  isActionDisabled = false,
  children,
  errorText,
  onGoogleClick,
  onAppleClick,
  className,
  showRegisterLink = true,
  registerLinkTo = '/register',
}) => {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    onSubmit?.(e);
    if (!onSubmit) {
      e.preventDefault();
      onAction?.();
    }
  };

  return (
    <form className={[styles.panel, className].filter(Boolean).join(' ')} onSubmit={handleSubmit} noValidate>
      <div className={styles.groupUserData}>
        <div className={styles.socialButtons}>
          <ButtonUI variant="secondary" onClick={onGoogleClick} isWide iconLeft={<GoogleIcon />} type="button">
            Продолжить с Google
          </ButtonUI>

          <ButtonUI variant="secondary" onClick={onAppleClick} isWide iconLeft={<AppleIcon />} type="button">
            Продолжить с Apple
          </ButtonUI>
        </div>

        <div className={styles.divider}>
          <span className={styles.dividerLine} aria-hidden="true" />
          <span>или</span>
          <span className={styles.dividerLine} aria-hidden="true" />
        </div>

        <div className={styles.fields}>{children}</div>

        {errorText && (
          <p className={styles.formError} role="alert">
            {errorText}
          </p>
        )}
      </div>
      {(actionText || showRegisterLink) && (
        <div className={styles.groupButtons}>
          {actionText && (
            <div className={styles.action}>
              <ButtonUI variant="primary" disabled={isActionDisabled} isWide type="submit">
                {actionText}
              </ButtonUI>
            </div>
          )}

          {showRegisterLink && (
            <Link className={styles.registerLink} to={registerLinkTo}>
              Зарегистрироваться
            </Link>
          )}
        </div>
      )}
    </form>
  );
};
