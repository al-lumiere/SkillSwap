import type { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { ProfileNav } from '@features/profile/profile-nav';

import styles from './profile.module.css';

export const ProfilePage: FC = () => (
  <div className={styles.wrapper}>
    <div className={styles.NavBlock}>
      <ProfileNav />
    </div>
    <div className={styles.ContentBlock}>
      <Outlet />
    </div>
  </div>
);

export default ProfilePage;
