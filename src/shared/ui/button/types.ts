import { ReactNode, ButtonHTMLAttributes } from 'react';

export type ButtonUIVariant = 'primary' | 'secondary' | 'tertiary';

export interface ButtonUIProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  children: ReactNode;
  variant: ButtonUIVariant;
}
