import { FC } from 'react';
import { TUserPanelUIProps } from './type';
import style from './user-authed-panel.module.css';

export const UserAuthedPanelUI: FC<TUserPanelUIProps> = ({ actions, userName, avatarUrl, onUserClick }) => (
  <div className={style.user_panel}>
    <div className={style.actions}>{actions}</div>
    <button type="button" onClick={onUserClick} className={style.profile_button}>
      <span className={style.user_name}>{userName}</span>
      <img alt="Аватарка пользователя" src={avatarUrl} className={style.avatar} />
    </button>
  </div>
);
