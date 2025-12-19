import type { FC } from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { HeaderLayout } from './header-layout';
import type { TAppHeaderProps } from './type';

/**
 * Контейнер для HeaderLayout:
 * - не хранит UI-состояние в Redux
 * - держит только минимальные локальные значения (поиск/открытие меню), если их не контролируют извне
 * - даёт дефолтную навигацию на /login и /register
 *
 * Важно: активность пунктов навигации НЕ должна сохраняться между переходами.
 * Поэтому «О проекте» считаем активным только когда текущий URL = /about.
 */
export const AppHeader: FC<TAppHeaderProps> = ({
  variant = 'full',
  onClose,
  isAuthenticated = false,
  userPanelProps,
  guestPanelProps,
  onAboutClick,
  onAllSkillsClick,
  isAllSkillsOpen: isAllSkillsOpenProp,
  onThemeClick,
  onNotificationClick,
  onFavoriteClick,
  searchValue: searchValueProp,
  onSearchChange,
  onSearchClear,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchValueState, setSearchValueState] = useState('');
  const [isAllSkillsOpenState, setIsAllSkillsOpenState] = useState(false);

  const searchValue = searchValueProp ?? searchValueState;
  const isAllSkillsOpen = isAllSkillsOpenProp ?? isAllSkillsOpenState;

  // «О проекте» ведёт на /about (которого нет в роутере → откроется NotFoundPage по "*").
  // Активность зависит только от текущего пути и НЕ конфликтует с «Все навыки».
  const isAboutActive = location.pathname === '/about';

  if (variant === 'auth') {
    return <HeaderLayout variant="auth" onClose={onClose} />;
  }

  const handleAboutClick = () => {
    onAboutClick?.();

    // Открываем not-found (через отсутствие роута /about).
    navigate('/about');
  };

  const handleAllSkillsClick = () => {
    if (isAllSkillsOpenProp === undefined) {
      setIsAllSkillsOpenState((prev) => !prev);
    }
    onAllSkillsClick?.();
  };

  const handleSearchChange = (value: string) => {
    if (searchValueProp === undefined) {
      setSearchValueState(value);
    }
    onSearchChange?.(value);
  };

  const handleSearchClear = () => {
    if (searchValueProp === undefined) {
      setSearchValueState('');
    }
    onSearchClear?.();
  };

  const handleLogin = () => {
    if (guestPanelProps?.onLogin) {
      guestPanelProps.onLogin();
      return;
    }
    navigate('/login');
  };

  const handleSignup = () => {
    if (guestPanelProps?.onSignup) {
      guestPanelProps.onSignup();
      return;
    }
    navigate('/register');
  };

  if (isAuthenticated) {
    return (
      <HeaderLayout
        variant="full"
        isAuthenticated
        userPanelProps={
          userPanelProps ?? {
            userName: 'Пользователь',
          }
        }
        onAboutClick={handleAboutClick}
        onAllSkillsClick={handleAllSkillsClick}
        isAboutActive={isAboutActive}
        isAllSkillsOpen={isAllSkillsOpen}
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
        onSearchClear={handleSearchClear}
        onThemeClick={onThemeClick}
        onNotificationClick={onNotificationClick}
        onFavoriteClick={onFavoriteClick}
      />
    );
  }

  return (
    <HeaderLayout
      variant="full"
      isAuthenticated={false}
      guestPanelProps={{
        onLogin: handleLogin,
        onSignup: handleSignup,
      }}
      onAboutClick={handleAboutClick}
      onAllSkillsClick={handleAllSkillsClick}
      isAboutActive={isAboutActive}
      isAllSkillsOpen={isAllSkillsOpen}
      searchValue={searchValue}
      onSearchChange={handleSearchChange}
      onSearchClear={handleSearchClear}
      onThemeClick={onThemeClick}
    />
  );
};
