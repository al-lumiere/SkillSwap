import { FC } from 'react';
import styles from './profile-nav-ui.module.css';
import { ProfileNavUIProps } from './type';

export const ProfileNavUI: FC<ProfileNavUIProps> = ({ items }) => (
  <div className={styles.container}>
    {items.map(({ id, element }) => (
      <div key={id} className={styles.item}>
        {element}
      </div>
    ))}
  </div>
);
