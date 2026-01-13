import type { FC } from 'react';
import { LoginAuthPanel } from '@features/login-auth-panel';
import { IllustrationBlockUI } from '@ui/illustration-block';
import LightBulbIllustration from '@images/light-bulb';

import styles from './login.module.css';

export const LoginPage: FC = () => (
  <div className={styles.wrapper}>
    <h1 className={styles.title}>Вход</h1>
    <div className={styles.blocks}>
      <div className={styles.block}>
        <LoginAuthPanel />
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

export default LoginPage;
