import type { ReactNode } from 'react';

export interface ProfileNavElementUIProps {
  text: string;
  icon: ReactNode;
  to: string;
  end?: boolean;
}
