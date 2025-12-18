/* eslint-disable react/require-default-props */
import type { FC, ReactNode } from 'react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

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
  onNotificationClick?: () => void;
  onFavoriteClick?: () => void;

  /** Обработчики для кнопок "Войти" / "Зарегистрироваться".
   * Если не переданы — контейнер по умолчанию навигирует на /login и /register.
   */
  onLoginClick?: () => void;
  onRegisterClick?: () => void;

  onSearchChange?: (value: string) => void;
  onSearchClear?: () => void;
};

/**
 * Контейнер для HeaderLayout:
 * - хранит UI-состояние (поиск/активность/открытие меню) в Redux
 * - прячет useSelector/useDispatch от MainLayout
 */
export const AppHeader: FC<TAppHeaderProps> = ({
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
  onNotificationClick,
  onFavoriteClick,
  onLoginClick,
  onRegisterClick,
  onSearchChange,
  onSearchClear,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { searchValue, isAboutActive, isAllSkillsOpen } = useSelector((state) => state.header);

  const handleAboutClick = useCallback(() => {
    dispatch(headerActions.aboutClicked());
    onAboutClick?.();
  }, [dispatch, onAboutClick]);

  const handleAllSkillsClick = useCallback(() => {
    dispatch(headerActions.allSkillsToggled());
    onAllSkillsClick?.();
  }, [dispatch, onAllSkillsClick]);

  const handleSearchChange = useCallback(
    (value: string) => {
      dispatch(headerActions.setSearchValue(value));
      onSearchChange?.(value);
    },
    [dispatch, onSearchChange],
  );

  const handleSearchClear = useCallback(() => {
    dispatch(headerActions.clearSearch());
    onSearchClear?.();
  }, [dispatch, onSearchClear]);

  const handleLoginClick = useCallback(() => {
    if (onLoginClick) {
      onLoginClick();
      return;
    }
    navigate('/login');
  }, [navigate, onLoginClick]);

  const handleRegisterClick = useCallback(() => {
    if (onRegisterClick) {
      onRegisterClick();
      return;
    }
    navigate('/register');
  }, [navigate, onRegisterClick]);

  if (variant === 'auth') {
    return <HeaderLayout variant="auth" onClose={onClose} logo={logo} />;
  }

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
      onNotificationClick={onNotificationClick}
      onFavoriteClick={onFavoriteClick}
      onLoginClick={handleLoginClick}
      onRegisterClick={handleRegisterClick}
      searchValue={searchValue}
      onSearchChange={handleSearchChange}
      onSearchClear={handleSearchClear}
      isAboutActive={isAboutActive}
      isAllSkillsActive={isAllSkillsOpen}
    />
  );
};
