import type { ReactNode } from 'react';

export type THeaderVariant = 'full' | 'auth';

type THeaderSlots = {
  /** Необязательные слоты (если не переданы — отрисуются заглушки) */
  logo?: ReactNode;
  themeButton?: ReactNode;
  notificationButton?: ReactNode;
  favoriteButton?: ReactNode;
  userAuth?: ReactNode;
  userUnAuth?: ReactNode;
};

export type THeaderLayoutFullProps = THeaderSlots & {
  variant?: 'full';

  /** Обработчик клика по «О проекте» */
  onAboutClick: () => void;
  /** Обработчик клика по «Все навыки» */
  onAllSkillsClick: () => void;

  /** Состояние авторизации (только выбирает, какой блок пользователя отрисовать) */
  isAuthenticated: boolean;

  /** Значение поиска */
  searchValue: string;
  /** Обработчик изменения поиска */
  onSearchChange: (value: string) => void;
  /** Обработчик очистки поиска */
  onSearchClear: () => void;

  /** Необязательные флаги активного состояния пунктов навигации (подчёркивание) */
  isAboutActive?: boolean;
  isAllSkillsActive?: boolean;
};

export type THeaderLayoutAuthProps = Pick<THeaderSlots, 'logo'> & {
  variant: 'auth';
  /** Необязательный обработчик закрытия (кнопка появится, если передан) */
  onClose?: () => void;
};

export type THeaderLayoutProps = THeaderLayoutFullProps | THeaderLayoutAuthProps;
