import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogoUI } from '@ui/logo';
import { NavElementUI } from '@ui/nav-element';
import { SearchUI } from '@ui/search';
import { IconButtonUI } from '@ui/icon-button';
import { AllSkillsPopover } from '@features/all-skills-popover';
import { GuestUserPanelUI } from '@ui/user-guest';
import { ProfilePopover } from '@features/profile-popover';
import { ButtonUI } from '@ui/button';
import MoonIcon from '@icons/moon-icon';
import NotificationIcon from '@icons/notification-icon';
import LikeIcon from '@icons/like-icon';
import CrossIcon from '@icons/cross-icon';
import style from './header.module.css';
import { HeaderUIProps } from './type';

export const HeaderUI: FC<HeaderUIProps> = (props) => {
  const { variant } = props;
  const navigate = useNavigate();

  if (variant === 'full') {
    const { isUserAuth, searchValue, onSearchChange, onSearchClear } = props;
    return (
      <header className={style.header}>
        <LogoUI />
        <div className={style.navBlock}>
          <NavElementUI text="О проекте" onClick={() => {}} />
          <AllSkillsPopover />
        </div>
        <div className={style.search}>
          <SearchUI
            placeholder="Искать навык"
            value={searchValue ?? ''}
            onChange={onSearchChange}
            onClear={onSearchClear}
          />
        </div>
        <div className={style.right}>
          <IconButtonUI onClick={() => {}}>
            <MoonIcon />
          </IconButtonUI>
          {isUserAuth ? (
            <ProfilePopover
              actions={
                <>
                  <IconButtonUI onClick={() => {}}>
                    <NotificationIcon />
                  </IconButtonUI>
                  <IconButtonUI onClick={() => navigate('/profile/favorites')}>
                    <LikeIcon />
                  </IconButtonUI>
                </>
              }
            />
          ) : (
            <GuestUserPanelUI />
          )}
        </div>
      </header>
    );
  }

  const { onCloseClick } = props;
  return (
    <header className={style.header_compact}>
      <LogoUI />
      <ButtonUI variant="tertiary" onClick={onCloseClick}>
        Закрыть
        <CrossIcon />
      </ButtonUI>
    </header>
  );
};
