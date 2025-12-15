import type { Meta, StoryObj } from '@storybook/react-vite';
import { FC } from 'react';
import styles from './icon-button.module.css';
import LikeIcon from '../../assets/icons/like-icon';
import MoonIcon from '../../assets/icons/moon-icon';
import NotificationIcon from '../../assets/icons/notification-icon';
import { TIconButtonUiProps } from './type';

const IconButtonUIWithNotifications: FC<TIconButtonUiProps> = ({ isAuthenticated, hasNewNotifications = false }) => {
  const handleMoonClick = () => {
    console.log('Смена темы');
  };
  const handleNotificationClick = () => {
    console.log('Открыть уведомления');
  };
  const handleLikeClick = () => {
    console.log('Переход на страницу избранного');
  };

  return (
    <div className={styles.wrapper}>
      <MoonIcon className={styles.icon} onClick={handleMoonClick} />
      {isAuthenticated && (
        <>
          <div className={styles.notificationWrapper}>
            <NotificationIcon className={styles.icon} onClick={handleNotificationClick} />
            {hasNewNotifications && <span className={styles.notificationBadge} />}
          </div>
          <LikeIcon className={styles.icon} onClick={handleLikeClick} />
        </>
      )}
    </div>
  );
};

const meta: Meta<typeof IconButtonUIWithNotifications> = {
  title: 'UI/IconButtonUI',
  component: IconButtonUIWithNotifications,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    isAuthenticated: {
      control: 'boolean',
      description: 'Показывает/скрывает иконки для аутентифицированных пользователей',
    },
    hasNewNotifications: {
      control: 'boolean',
      description: 'Показывает индикатор новых уведомлений',
    },
  },
};

export default meta;

type Story = StoryObj<typeof IconButtonUIWithNotifications>;

export const NotAuthenticated: Story = {
  args: {
    isAuthenticated: false,
    hasNewNotifications: false,
  },
};

export const AuthenticatedWithoutNotifications: Story = {
  args: {
    isAuthenticated: true,
    hasNewNotifications: false,
  },
};

export const AuthenticatedWithNotifications: Story = {
  args: {
    isAuthenticated: true,
    hasNewNotifications: true,
  },
};
