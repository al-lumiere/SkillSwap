import type { MouseEventHandler, ReactNode } from 'react';

export type TNavElementUIProps = {
  text: string;
  icon?: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  isActive?: boolean;
};
