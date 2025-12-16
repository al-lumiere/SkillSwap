import type { ReactNode } from 'react';

export type THeaderLayoutProps = {
  /** "О проекте" click handler */
  onAboutClick: () => void;
  /** "Все навыки" click handler */
  onAllSkillsClick: () => void;

  /** Auth state (only controls which user block is rendered) */
  isAuthenticated: boolean;

  /** Search value */
  searchValue: string;
  /** Search change handler */
  onSearchChange: (value: string) => void;
  /** Search clear handler */
  onSearchClear: () => void;

  /** Optional active underline state for nav items */
  isAboutActive?: boolean;
  isAllSkillsActive?: boolean;

  /** Slots (stubs will be rendered if not provided) */
  logo?: ReactNode;
  themeButton?: ReactNode;
  userAuth?: ReactNode;
  userUnAuth?: ReactNode;
};
