import { FC } from 'react';
import { IconButtonUI } from '@ui/icon-button';
import { NavElementUI } from '@ui/nav-element-ui';
import { SearchUI } from '@ui/search';
import { Button } from '@ui/button';
import { Logo } from '@ui/logo';

import ChevronDownIcon from '../../shared/assets/icons/chevron-down';
import LikeIcon from '../../shared/assets/icons/like-icon';
import MoonIcon from '../../shared/assets/icons/moon-icon';
import NotificationIcon from '../../shared/assets/icons/notification-icon';
import CrossIcon from '../../shared/assets/icons/cross-icon';

import styles from './header-layout.module.css';
import { THeaderLayoutAuthProps, THeaderLayoutFullProps, THeaderLayoutProps } from './type';

const noop = () => undefined;

// Временные заглушки для отсутствующих UI-компонентов (UserAuthUI / UserUnAuthUI)
const ThemeButtonStub: FC = () => (
  <IconButtonUI onClick={noop}>
    <MoonIcon />
  </IconButtonUI>
);

type TIconStubProps = {
  onClick: () => void;
};

const NotificationButtonStub: FC<TIconStubProps> = ({ onClick }) => (
  <IconButtonUI onClick={onClick}>
    <NotificationIcon />
  </IconButtonUI>
);

const FavoriteButtonStub: FC<TIconStubProps> = ({ onClick }) => (
  <IconButtonUI onClick={onClick}>
    <LikeIcon />
  </IconButtonUI>
);

const UserUnAuthStub: FC<{ onLoginClick: () => void; onRegisterClick: () => void }> = ({
  onLoginClick,
  onRegisterClick,
}) => (
  <div className={styles.authButtons}>
    <Button text="Войти" variant="secondary" onClick={onLoginClick} />
    <Button text="Зарегистрироваться" variant="primary" onClick={onRegisterClick} />
  </div>
);

const UserAuthStub: FC = () => (
  <div className={styles.userAuthStub}>
    <span className={styles.userName}>Мария</span>
    <span className={styles.avatar} aria-hidden="true" />
  </div>
);

export const HeaderLayout: FC<THeaderLayoutProps> = (props) => {
  // ✅ по правилу react/destructuring-assignment
  const { variant = 'full' } = props;

  if (variant === 'auth') {
    const { logo, onClose } = props as THeaderLayoutAuthProps;

    return (
      <header className={styles.header}>
        <div className={`${styles.container} ${styles.containerAuth}`}>
          <div className={styles.left}>{logo ?? <Logo />}</div>

          <div className={styles.right}>
            {onClose ? <Button text="Закрыть" variant="tertiary" icon={<CrossIcon />} onClick={onClose} /> : null}
          </div>
        </div>
      </header>
    );
  }

  const {
    onAboutClick,
    onAllSkillsClick,
    onNotificationClick,
    onFavoriteClick,
    onLoginClick,
    onRegisterClick,
    onSearchChange,
    onSearchClear,
    isAuthenticated,
    isAboutActive = false,
    isAllSkillsActive = false,
    logo,
    themeButton,
    notificationButton,
    favoriteButton,
    searchValue,
    userAuth,
    userUnAuth,
  } = props as THeaderLayoutFullProps;

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.left}>
          {logo ?? <Logo />}

          <nav className={styles.navBlock} aria-label="Навигация">
            <NavElementUI text="О проекте" onClick={onAboutClick} isActive={isAboutActive} />
            <NavElementUI
              text="Все навыки"
              icon={<ChevronDownIcon />}
              onClick={onAllSkillsClick}
              isActive={isAllSkillsActive}
            />
          </nav>
        </div>

        <div className={styles.search}>
          <SearchUI value={searchValue} onChange={onSearchChange} onClear={onSearchClear} />
        </div>

        <div className={styles.right}>
          {themeButton ?? <ThemeButtonStub />}
          {isAuthenticated ? (
            <>
              {notificationButton ?? <NotificationButtonStub onClick={onNotificationClick ?? noop} />}
              {favoriteButton ?? <FavoriteButtonStub onClick={onFavoriteClick ?? noop} />}
              {userAuth ?? <UserAuthStub />}
            </>
          ) : (
            (userUnAuth ?? (
              <UserUnAuthStub onLoginClick={onLoginClick ?? noop} onRegisterClick={onRegisterClick ?? noop} />
            ))
          )}
        </div>
      </div>
    </header>
  );
};
