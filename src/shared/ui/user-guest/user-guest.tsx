import { FC } from 'react';
import { ButtonUI } from '@ui/button';
import style from './user-guest.module.css';
import { TGuestUserPanelUIProps } from './type';

export const GuestUserPanelUI: FC<TGuestUserPanelUIProps> = ({ onLogin, onSignup }) => (
  <div className={style.buttons_container}>
    <ButtonUI variant="secondary" onClick={onLogin}>
      Войти
    </ButtonUI>
    <ButtonUI variant="primary" onClick={onSignup}>
      Зарегестрироваться
    </ButtonUI>
  </div>
);
