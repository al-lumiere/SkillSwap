import type { FormEventHandler, ReactNode } from 'react';

export type AuthPanelUIProps = {
  actionText?: string;
  onSubmit?: FormEventHandler<HTMLFormElement>;
  onAction?: () => void;
  isActionDisabled?: boolean;
  children: ReactNode;
  errorText?: string;
  onGoogleClick?: () => void;
  onAppleClick?: () => void;
  className?: string;
  showRegisterLink?: boolean;
  registerLinkTo?: string;
};
