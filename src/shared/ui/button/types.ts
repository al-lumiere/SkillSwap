import { ReactNode, ButtonHTMLAttributes, CSSProperties } from 'react';

export type ButtonUIVariant = 'primary' | 'secondary' | 'tertiary';

export interface ButtonUIProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  children: ReactNode;
  variant?: ButtonUIVariant;
  isWide?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}
