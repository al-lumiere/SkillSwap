import type { MouseEventHandler, ReactNode } from 'react';

export type AuthPanelUIProps = {
  actionText: string;
  onAction?: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
  errorText?: string;
  onGoogleClick?: () => void;
  onAppleClick?: () => void;
  className?: string;
  showRegisterLink?: boolean;
  registerLinkTo?: string;
};
