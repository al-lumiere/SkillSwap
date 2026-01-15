import type { FormEventHandler, ReactNode } from 'react';

export type AuthPanelUIProps = {
  actionText?: string;
  onAction?: () => void;
  children: ReactNode;
  errorText?: string;
  onGoogleClick?: () => void;
  onAppleClick?: () => void;
  className?: string;
  showRegisterLink?: boolean;
  registerLinkTo?: string;
};
