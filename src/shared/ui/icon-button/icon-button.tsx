import { FC } from 'react';
import styles from './icon-button.module.css';
import { TIconButtonUiProps } from './type';
import LikeIcon from '../../assets/icons/like-icon';
import MoonIcon from '../../assets/icons/moon-icon';
import NotificationIcon from '../../assets/icons/notification-icon';

export const IconButtonUI: FC<TIconButtonUiProps> = ({ isAuthenticated }) => {
  // TODO: Подключить селектор состояния уведомлений из стора
  const hasNewNotifications = true;

  const handleMoonClick = () => {
    // TODO: Смена темы – необязательная задача
    console.log('Смена темы');
  };
  const handleNotificationClick = () => {
    // TODO: Подключить компонент уведомлений
    console.log('Открыть уведомления');
  };
  const handleLikeClick = () => {
    // TODO: Подключить роутинг на страницу избранного
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
