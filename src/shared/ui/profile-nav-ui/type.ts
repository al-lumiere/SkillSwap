import { ReactNode } from 'react';

interface ProfileNavItem {
  id: string;
  element: ReactNode;
}

export interface ProfileNavUIProps {
  items: ProfileNavItem[];
}
