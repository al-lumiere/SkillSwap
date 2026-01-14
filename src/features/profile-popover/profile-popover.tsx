import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '@store/store';
import { PopoverUI } from '@ui/popover';
import { ButtonUI } from '@ui/button';
import { UserAuthedPanelUI } from '@ui/user-authed-panel';
import LogoutIcon from '../../shared/assets/icons/logout-icon';
import styles from './profile-popover.module.css';
import { logoutUserThunk } from '../../store/slices/auth/userSlice';
import { ProfilePopoverProps } from './type';

export const ProfilePopover: FC<ProfilePopoverProps> = ({ actions }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Получаем данные текущего пользователя из userSlice
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
    // Навигация на главную или логин может быть обработана здесь или в useEffect в App
  };

  // Элемент, на который кликаем в хедере (Имя + Аватар)
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
      offset={10}
      maxWidth={320}
      matchWidth={false}
      anchor={anchorElement}
    >
      <div className={styles.container}>
        <ButtonUI variant="tertiary" isWide onClick={handleProfileClick}>
          Личный кабинет
        </ButtonUI>

        <ButtonUI variant="tertiary" isWide onClick={handleLogoutClick} iconRight={<LogoutIcon />}>
          Выйти из аккаунта
        </ButtonUI>
      </div>
    </PopoverUI>
  );
};
