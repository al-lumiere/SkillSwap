import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '@store/store';
import { PopoverUI } from '@ui/popover';
import { ButtonUI } from '@ui/button';
import { UserAuthedPanelUI } from '@ui/user-authed-panel';
import { logoutUserThunk } from '@slices/auth/userSlice';
import LogoutIcon from '@icons/logout-icon';
import { ProfilePopoverProps } from './type';

import styles from './profile-popover.module.css';

export const ProfilePopover: FC<ProfilePopoverProps> = ({ actions }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);

  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen((v) => !v);
  const handleClose = () => setIsOpen(false);

  const handleProfileClick = () => {
    navigate('/profile');
    handleClose();
  };

  const handleLogoutClick = () => {
    dispatch(logoutUserThunk());
    handleClose();
  };

  const anchorElement = (
    <UserAuthedPanelUI
      userName={currentUser?.name || 'Гость'}
      avatarUrl={currentUser?.avatar || '/default-avatar.png'}
      onUserClick={handleToggle}
      actions={actions}
    />
  );

  return (
    <PopoverUI
      isOpen={isOpen}
      onClose={handleClose}
      placement="bottom-end"
      offset={25}
      maxWidth={278}
      matchWidth={false}
      anchor={anchorElement}
    >
      <div className={styles.container}>
        <div className={styles.menuBtn}>
          <ButtonUI variant="tertiary" isWide onClick={handleProfileClick}>
            Личный кабинет
          </ButtonUI>
        </div>
        <div className={styles.menuBtn}>
          <ButtonUI variant="tertiary" isWide onClick={handleLogoutClick} iconRight={<LogoutIcon />}>
            Выйти из аккаунта
          </ButtonUI>
        </div>
      </div>
    </PopoverUI>
  );
};
