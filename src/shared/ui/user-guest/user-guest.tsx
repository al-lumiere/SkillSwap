import { FC } from 'react';
import { ButtonUI } from '@ui/button';
import style from './user-guest.module.css';
import { TGuestUserPanelUIProps } from './type';

export const GuestUserPanelUI: FC<TGuestUserPanelUIProps> = ({ onLogin, onSignup }) => (
  <div className={style.buttons_container}>
    <ButtonUI variant="secondary" text="Войти" onClick={onLogin} />
    <ButtonUI variant="primary" text="Зарегестрироваться" onClick={onSignup} />
  </div>
);
