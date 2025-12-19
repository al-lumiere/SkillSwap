import { FC } from 'react';
import { Link } from 'react-router-dom';

import { ButtonUI } from '@ui/button';
import style from './user-guest.module.css';

export const GuestUserPanelUI: FC = () => (
  <div className={style.buttons_container}>
    <Link to="/login">
      <ButtonUI variant="secondary">Войти</ButtonUI>
    </Link>
    <Link to="/register">
      <ButtonUI variant="primary">Зарегистрироваться</ButtonUI>
    </Link>
  </div>
);
