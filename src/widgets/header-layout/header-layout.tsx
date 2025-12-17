import { FC } from 'react';
import { IconButtonUI } from '@ui/icon-button';
import { NavElementUI } from '@ui/nav-element-ui';
import { SearchUI } from '@ui/search';

import ChevronDownIcon from '../../shared/assets/icons/chevron-down';
import LikeIcon from '../../shared/assets/icons/like-icon';
import MoonIcon from '../../shared/assets/icons/moon-icon';
import NotificationIcon from '../../shared/assets/icons/notification-icon';

import styles from './header-layout.module.css';
import { THeaderLayoutAuthProps, THeaderLayoutFullProps, THeaderLayoutProps } from './type';

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M18 6L6 18" stroke="#253017" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M6 6L18 18" stroke="#253017" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const SparkIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
    <path
      d="M11 1.5C12.1 6.2 15.8 9.9 20.5 11C15.8 12.1 12.1 15.8 11 20.5C9.9 15.8 6.2 12.1 1.5 11C6.2 9.9 9.9 6.2 11 1.5Z"
      fill="currentColor"
    />
  </svg>
);

const noop = () => undefined;

// Временные заглушки для отсутствующих UI-компонентов (LogoUI / IconButtonUI / UserAuthUI / UserUnAuthUI)
const LogoStub: FC = () => (
  <div className={styles.logoStub} aria-label="SkillSwap">
    <span className={styles.logoIcon} aria-hidden="true">
      <SparkIcon />
    </span>
    SkillSwap
  </div>
);

const ThemeButtonStub: FC = () => (
  <IconButtonUI onClick={noop}>
    <MoonIcon color="#253017" />
  </IconButtonUI>
);

const NotificationButtonStub: FC = () => (
  <IconButtonUI onClick={noop}>
    <NotificationIcon color="#253017" />
  </IconButtonUI>
);

const FavoriteButtonStub: FC = () => (
  <IconButtonUI onClick={noop}>
    <LikeIcon color="#253017" />
  </IconButtonUI>
);

const UserUnAuthStub: FC = () => (
  <div className={styles.userUnAuthStub}>
    <div className={styles.btnOutline}>Войти</div>
    <div className={styles.btnFilled}>Зарегистрироваться</div>
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
          <div className={styles.left}>{logo ?? <LogoStub />}</div>

          <div className={styles.right}>
            {onClose ? (
              <button type="button" className={styles.closeButton} onClick={onClose}>
                <span>Закрыть</span>
                <span className={styles.closeIcon}>
                  <CloseIcon />
                </span>
              </button>
            ) : null}
          </div>
        </div>
      </header>
    );
  }

  const {
    onAboutClick,
    onAllSkillsClick,
    isAuthenticated,
    searchValue,
    onSearchChange,
    onSearchClear,
    isAboutActive = false,
    isAllSkillsActive = false,
    logo,
    themeButton,
    notificationButton,
    favoriteButton,
    userAuth,
    userUnAuth,
  } = props as THeaderLayoutFullProps;

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.left}>
          {logo ?? <LogoStub />}

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
              {notificationButton ?? <NotificationButtonStub />}
              {favoriteButton ?? <FavoriteButtonStub />}
              {userAuth ?? <UserAuthStub />}
            </>
          ) : (
            (userUnAuth ?? <UserUnAuthStub />)
          )}
        </div>
      </div>
    </header>
  );
};
