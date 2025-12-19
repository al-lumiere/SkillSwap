import type { TGuestUserPanelUIProps } from '@ui/user-guest/type';
import type { TUserPanelUIProps } from '@ui/user-authed-panel/type';

export type THeaderVariant = 'full' | 'auth';

type THeaderLayoutFullBaseProps = {
  variant?: 'full';

  /** Навигация */
  onAboutClick?: () => void;
  onAllSkillsClick?: () => void;

  /** Подсветка «О проекте» (обычно вычисляется по роуту в контейнере) */
  isAboutActive?: boolean;

  /** UI-флаг раскрытого меню «Все навыки» (подсветка/поворот шеврона) */
  isAllSkillsOpen?: boolean;

  /** Поиск */
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onSearchClear?: () => void;

  /** Иконки/действия */
  onThemeClick?: () => void;
  onNotificationClick?: () => void;
  onFavoriteClick?: () => void;
};

type TAuthedUserProps = {
  isAuthenticated: true;
  /** Пропсы панели авторизованного пользователя (кроме actions — их собирает HeaderLayout) */
  userPanelProps: Omit<TUserPanelUIProps, 'actions'>;
  guestPanelProps?: never;
};

type TGuestUserProps = {
  isAuthenticated: false;
  /** Пропсы гостевой панели (кнопки «Войти/Зарегистрироваться») */
  guestPanelProps: TGuestUserPanelUIProps;
  userPanelProps?: never;
};

export type THeaderLayoutFullProps = THeaderLayoutFullBaseProps & (TAuthedUserProps | TGuestUserProps);

export type THeaderLayoutAuthProps = {
  variant: 'auth';
  /** Необязательный обработчик закрытия (кнопка появится, если передан) */
  onClose?: () => void;
};

export type THeaderLayoutProps = THeaderLayoutFullProps | THeaderLayoutAuthProps;

/**
 * Пропсы контейнера AppHeader:
 * - даёт дефолтную навигацию на /login и /register
 * - может держать локальные UI-значения (например поиск)
 */
export type TAppHeaderProps = {
  variant?: THeaderVariant;
  onClose?: () => void;

  /**
   * Для демо/разработки можно пробрасывать явно.
   * В реальном проекте часто будет вычисляться из store.
   */
  isAuthenticated?: boolean;

  /** Панель авторизованного пользователя (обязательна, если isAuthenticated=true) */
  userPanelProps?: Omit<TUserPanelUIProps, 'actions'>;

  /**
   * Панель гостя. Можно передать частично или полностью.
   * Если не передать, контейнер создаст дефолтные handlers (/login, /register).
   */
  guestPanelProps?: Partial<TGuestUserPanelUIProps>;

  onAboutClick?: () => void;
  onAllSkillsClick?: () => void;

  /** Можно передать извне, если меню контролируется снаружи */
  isAllSkillsOpen?: boolean;

  onThemeClick?: () => void;
  onNotificationClick?: () => void;
  onFavoriteClick?: () => void;

  /** Можно контролировать поиск извне, иначе контейнер будет держать локально */
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onSearchClear?: () => void;
};
