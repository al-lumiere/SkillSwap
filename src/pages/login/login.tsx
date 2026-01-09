import { type FC, type ChangeEvent, useState } from 'react';
import { IllustrationBlockUI } from '@ui/illustration-block';
import { AuthPanelUI } from '@components/auth-panel-ui';
import { InputUI } from '@ui/input';
import LightBulbIllustration from '@images/light-bulb';

import styles from './login.module.css';

/* AuthPanelUI нужно заменить на умный компонент! */

export const LoginPage: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Вход</h1>
      <div className={styles.blocks}>
        <div className={styles.block}>
          <AuthPanelUI
            actionText="Войти"
            onAction={() => {}}
            onGoogleClick={() => {}}
            onAppleClick={() => {}}
            errorText=""
            showRegisterLink
          >
            <InputUI
              label="Email"
              name="email"
              type="email"
              placeholder="Введите email"
              value={email}
              onChange={handleEmailChange}
            />
            <InputUI
              label="Пароль"
              name="password"
              type="password"
              placeholder="Введите ваш пароль"
              value={password}
              onChange={handlePasswordChange}
            />
          </AuthPanelUI>
        </div>
        <div className={styles.block}>
          <IllustrationBlockUI
            illustration={<LightBulbIllustration />}
            title="С возвращением в SkillSwap!"
            description="Обменивайтесь знаниями и навыками с другими людьми"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
