import { ButtonUI } from '@ui/button';
import { IconButtonUI } from '@ui/icon-button';
import { LogoUI } from '@ui/logo';
import { NavElementUI } from '@ui/nav-element-ui';
import { SearchUI } from '@ui/search';
import { UserAuthedPanelUI } from '@ui/user-authed-panel';
import { GuestUserPanelUI } from '@ui/user-guest';

import ChevronDownIcon from '../../shared/assets/icons/chevron-down';
import LikeIcon from '../../shared/assets/icons/like-icon';
import MoonIcon from '../../shared/assets/icons/moon-icon';
import NotificationIcon from '../../shared/assets/icons/notification-icon';
import CrossIcon from '../../shared/assets/icons/cross-icon';

import styles from './header-layout.module.css';
import { THeaderLayoutAuthProps, THeaderLayoutFullProps, THeaderLayoutProps } from './type';

const noop = () => undefined;

export const HeaderLayout = (props: THeaderLayoutProps) => {
  const { variant = 'full' } = props;

  if (variant === 'auth') {
    const { onClose } = props as THeaderLayoutAuthProps;

    return (
      <header className={styles.header}>
        <div className={`${styles.container} ${styles.containerAuth}`}>
          <div className={styles.left}>
            <LogoUI />
          </div>

          <div className={styles.right}>
            {onClose ? <ButtonUI text="Закрыть" variant="tertiary" icon={<CrossIcon />} onClick={onClose} /> : null}
          </div>
        </div>
      </header>
    );
  }

  const fullProps = props as THeaderLayoutFullProps;
  const {
    isAuthenticated,
    onAboutClick,
    onAllSkillsClick,
    isAboutActive = false,
    isAllSkillsOpen = false,
    searchValue = '',
    onSearchChange,
    onSearchClear,
    onThemeClick,
    onNotificationClick,
    onFavoriteClick,
  } = fullProps;

  const chevronClassName = isAllSkillsOpen ? styles.chevronOpen : styles.chevron;

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.left}>
          <LogoUI />

          <nav className={styles.navBlock} aria-label="Навигация">
            <NavElementUI text="О проекте" onClick={onAboutClick} isActive={isAboutActive} />
            <NavElementUI
              text="Все навыки"
              icon={<ChevronDownIcon className={chevronClassName} />}
              onClick={onAllSkillsClick}
              isActive={isAllSkillsOpen}
            />
          </nav>
        </div>

        <div className={styles.search}>
          <SearchUI value={searchValue} onChange={onSearchChange} onClear={onSearchClear} />
        </div>

        <div className={styles.right}>
          {isAuthenticated ? (
            <UserAuthedPanelUI
              actions={
                <>
                  <IconButtonUI onClick={onThemeClick ?? noop}>
                    <MoonIcon />
                  </IconButtonUI>
                  <IconButtonUI onClick={onNotificationClick ?? noop}>
                    <NotificationIcon />
                  </IconButtonUI>
                  <IconButtonUI onClick={onFavoriteClick ?? noop}>
                    <LikeIcon />
                  </IconButtonUI>
                </>
              }
              userName={fullProps.userPanelProps.userName}
              avatarUrl={fullProps.userPanelProps.avatarUrl}
              onUserClick={fullProps.userPanelProps.onUserClick}
            />
          ) : (
            <>
              <IconButtonUI onClick={onThemeClick ?? noop}>
                <MoonIcon />
              </IconButtonUI>
              <GuestUserPanelUI
                onLogin={fullProps.guestPanelProps.onLogin}
                onSignup={fullProps.guestPanelProps.onSignup}
              />
            </>
          )}
        </div>
      </div>
    </header>
  );
};
