import { FC } from 'react';
import { LogoUI } from '@ui/logo';
import { NavElementUI } from '@ui/nav-element-ui';
import { SearchUI } from '@ui/search';
import { IconButtonUI } from '@ui/icon-button';
import { GuestUserPanelUI } from '@ui/user-guest';
import { UserAuthedPanelUI } from '@ui/user-authed-panel';
import { ButtonUI } from '@ui/button';
import ChevronDownIcon from '../../shared/assets/icons/chevron-down';
import MoonIcon from '../../shared/assets/icons/moon-icon';
import NotificationIcon from '../../shared/assets/icons/notification-icon';
import LikeIcon from '../../shared/assets/icons/like-icon';
import CrossIcon from '../../shared/assets/icons/cross-icon';
import style from './header.module.css';
import { HeaderUIProps } from './type';

export const HeaderUI: FC<HeaderUIProps> = (props) => {
  const { variant } = props;

  if (variant === 'full') {
    const { isUserAuth, userName } = props;
    return (
      <header className={style.header}>
        <LogoUI />
        <div className={style.navBlock}>
          <NavElementUI text="О проекте" onClick={() => {}} />
          <NavElementUI text="Все навыки" onClick={() => {}} icon={<ChevronDownIcon />} />
        </div>
        <div className={style.search}>
          <SearchUI />
        </div>
        <div className={style.right}>
          <IconButtonUI onClick={() => {}}>
            <MoonIcon />
          </IconButtonUI>
          {isUserAuth ? (
            <UserAuthedPanelUI
              userName={userName ?? ''}
              actions={
                <>
                  <IconButtonUI onClick={() => {}}>
                    <NotificationIcon />
                  </IconButtonUI>
                  <IconButtonUI onClick={() => {}}>
                    <LikeIcon />
                  </IconButtonUI>
                </>
              }
            />
          ) : (
            <GuestUserPanelUI onLogin={() => {}} onSignup={() => {}} />
          )}
        </div>
      </header>
    );
  }

  const { onCloseClick } = props;
  return (
    <header className={style.header}>
      <LogoUI />
      <ButtonUI variant="tertiary" onClick={onCloseClick}>
        Закрыть
        <CrossIcon />
      </ButtonUI>
    </header>
  );
};
