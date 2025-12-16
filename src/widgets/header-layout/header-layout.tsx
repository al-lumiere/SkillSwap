import { FC } from 'react';
import { NavElementUI } from '@ui/nav-element-ui';
import { SearchUI } from '@ui/search';
import styles from './header-layout.module.css';
import { THeaderLayoutProps } from './type';

const ArrowDownIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 15.9354C11.3539 15.9354 10.7078 15.6862 10.2186 15.197L4.20075 9.17912C3.93308 8.91145 3.93308 8.46842 4.20075 8.20075C4.46842 7.93308 4.91145 7.93308 5.17912 8.20075L11.197 14.2186C11.64 14.6617 12.36 14.6617 12.803 14.2186L18.8209 8.20075C19.0885 7.93308 19.5316 7.93308 19.7992 8.20075C20.0669 8.46842 20.0669 8.91145 19.7992 9.17912L13.7814 15.197C13.2922 15.6862 12.6461 15.9354 12 15.9354Z"
      fill="#253017"
    />
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

const MoonIcon = () => (
  <svg width="24" height="24" fill="none">
    <path
      fill="#253017"
      d="M12.425 22c-.158 0-.316 0-.474-.01-5.209-.232-9.562-4.427-9.925-9.543C1.71 8.057 4.25 3.955 8.342 2.234c1.163-.483 1.777-.111 2.037.159.26.26.623.865.14 1.971a7.623 7.623 0 0 0-.633 3.116c.019 4.121 3.442 7.618 7.618 7.786.605.028 1.2-.019 1.777-.121 1.227-.223 1.739.27 1.934.586.196.316.419.995-.325 2C18.918 20.428 15.783 22 12.425 22Zm-9.013-9.655c.317 4.428 4.093 8.055 8.595 8.25a9.052 9.052 0 0 0 7.748-3.683 1.86 1.86 0 0 0 .233-.41 1.464 1.464 0 0 0-.465.029 9.737 9.737 0 0 1-2.084.14c-4.911-.196-8.93-4.317-8.957-9.172 0-1.284.25-2.52.762-3.683.093-.205.112-.344.121-.419-.083 0-.232.019-.474.121-3.544 1.488-5.739 5.041-5.479 8.827Z"
    />
  </svg>
);

// Temporary stubs for missing UI components (LogoUI / IconButtonUI / UserAuthUI / UserUnAuthUI)
const LogoStub: FC = () => (
  <button type="button" className={styles.logoStub} aria-label="SkillSwap">
    <span className={styles.logoIcon} aria-hidden="true">
      <SparkIcon />
    </span>
    SkillSwap
  </button>
);

const ThemeButtonStub: FC = () => (
  <button type="button" className={styles.themeButtonStub} aria-label="Переключить тему">
    <MoonIcon />
  </button>
);

const UserUnAuthStub: FC = () => (
  <div className={styles.userUnAuthStub}>
    <button type="button" className={styles.btnOutline}>
      Войти
    </button>
    <button type="button" className={styles.btnFilled}>
      Зарегистрироваться
    </button>
  </div>
);

const UserAuthStub: FC = () => (
  <div className={styles.userAuthStub}>
    <span className={styles.userName}>Мария</span>
    <span className={styles.avatar} aria-hidden="true" />
  </div>
);

export const HeaderLayout: FC<THeaderLayoutProps> = ({
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
  userAuth,
  userUnAuth,
}) => (
  <header className={styles.header}>
    <div className={styles.container}>
      <div className={styles.left}>
        {logo ?? <LogoStub />}

        <nav className={styles.navBlock} aria-label="Навигация">
          <NavElementUI text="О проекте" onClick={onAboutClick} isActive={isAboutActive} />
          <NavElementUI
            text="Все навыки"
            icon={<ArrowDownIcon />}
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
        {isAuthenticated ? (userAuth ?? <UserAuthStub />) : (userUnAuth ?? <UserUnAuthStub />)}
      </div>
    </div>
  </header>
);
