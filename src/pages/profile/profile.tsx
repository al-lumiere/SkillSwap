import type { FC } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './profile.module.css';

export const ProfilePage: FC = () => (
  // todo: вместо <h1> описать лейаут страницы профайла
  <main>
    <h1>Profile Page</h1>
    <Outlet />
  </main>
);

export default ProfilePage;
