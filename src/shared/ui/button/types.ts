import { ReactNode, ButtonHTMLAttributes, CSSProperties } from 'react';

export type ButtonUIVariant = 'primary' | 'secondary' | 'tertiary';

export interface ButtonUIProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  children: ReactNode;
  variant?: ButtonUIVariant;
  padding?: CSSProperties['padding'];
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}
