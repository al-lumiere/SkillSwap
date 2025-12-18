import { FC } from 'react';
import { Button } from '@ui/button';
import style from './user-guest.module.css';
import { TGuestUserPanelProps } from './type';

export const GuestUserPanel: FC<TGuestUserPanelProps> = ({ onLogin, onSignup }) => (
  <div className={style.buttons_container}>
    <Button variant="secondary" text="Войти" onClick={onLogin} />
    <Button variant="primary" text="Зарегестрироваться" onClick={onSignup} />
  </div>
);
