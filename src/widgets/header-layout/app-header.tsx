import type { FC, ReactNode } from 'react';

import { useDispatch, useSelector } from '../../app/providers/store/store';
import { headerActions } from '../../entities/slices/headerSlice';

import { HeaderLayout } from './header-layout';
import type { THeaderVariant } from './type';

export type TAppHeaderProps = {
  /** Вариант хедера (по умолчанию full) */
  variant?: THeaderVariant;

  /** Кнопка "Закрыть" (используется только в варианте auth) */
  onClose?: () => void;

  /** Состояние авторизации (только для выбора userAuth / userUnAuth) */
  isAuthenticated?: boolean;

  /** Необязательные слоты (если не переданы — отрисуются заглушки) */
  logo?: ReactNode;
  themeButton?: ReactNode;
  notificationButton?: ReactNode;
  favoriteButton?: ReactNode;
  userAuth?: ReactNode;
  userUnAuth?: ReactNode;

  /** Необязательные внешние обработчики (например, для навигации). Вызываются ПОСЛЕ dispatch */
  onAboutClick?: () => void;
  onAllSkillsClick?: () => void;
  onSearchChange?: (value: string) => void;
  onSearchClear?: () => void;
};

/**
 * Контейнер для HeaderLayout:
 * - хранит UI-состояние (поиск/активность/открытие меню) в Redux
 * - прячет useSelector/useDispatch от MainLayout
 */
export const AppHeader: FC<TAppHeaderProps> = (props) => {
  const {
    variant = 'full',
    onClose,
    isAuthenticated = false,
    logo,
    themeButton,
    notificationButton,
    favoriteButton,
    userAuth,
    userUnAuth,
    onAboutClick,
    onAllSkillsClick,
    onSearchChange,
    onSearchClear,
  } = props;

  const dispatch = useDispatch();
  const searchValue = useSelector((state) => state.header.searchValue);
  const isAboutActive = useSelector((state) => state.header.isAboutActive);
  const isAllSkillsOpen = useSelector((state) => state.header.isAllSkillsOpen);

  if (variant === 'auth') {
    return <HeaderLayout variant="auth" logo={logo} onClose={onClose} />;
  }

  const handleAboutClick = () => {
    dispatch(headerActions.aboutClicked());
    onAboutClick?.();
  };

  const handleAllSkillsClick = () => {
    dispatch(headerActions.allSkillsToggled());
    onAllSkillsClick?.();
  };

  const handleSearchChange = (value: string) => {
    dispatch(headerActions.setSearchValue(value));
    onSearchChange?.(value);
  };

  const handleSearchClear = () => {
    dispatch(headerActions.clearSearch());
    onSearchClear?.();
  };

  return (
    <HeaderLayout
      variant="full"
      logo={logo}
      themeButton={themeButton}
      notificationButton={notificationButton}
      favoriteButton={favoriteButton}
      userAuth={userAuth}
      userUnAuth={userUnAuth}
      isAuthenticated={isAuthenticated}
      onAboutClick={handleAboutClick}
      onAllSkillsClick={handleAllSkillsClick}
      searchValue={searchValue}
      onSearchChange={handleSearchChange}
      onSearchClear={handleSearchClear}
      isAboutActive={isAboutActive}
      isAllSkillsActive={isAllSkillsOpen}
    />
  );
};

AppHeader.defaultProps = {
  variant: 'full',
  onClose: undefined,
  isAuthenticated: false,
  logo: undefined,
  themeButton: undefined,
  notificationButton: undefined,
  favoriteButton: undefined,
  userAuth: undefined,
  userUnAuth: undefined,
  onAboutClick: undefined,
  onAllSkillsClick: undefined,
  onSearchChange: undefined,
  onSearchClear: undefined,
};
