import { type FC, type ChangeEvent, useState } from 'react';
import { IllustrationBlockUI } from '@ui/illustration-block';
import { AuthPanelUI } from '@components/auth-panel-ui';
import { StepperUI } from '@ui/stepper';
import { InputUI } from '@ui/input';
import LightBulbIllustration from '@images/light-bulb';

import styles from './register.module.css';

/* AuthPanelUI нужно заменить на умный компонент! */

export const RegisterPage: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const args = {
    currentStep: 1,
    totalSteps: 3,
  };

  const [current, setCurrent] = useState(args.currentStep);

  const handleStepClick = (step: number) => {
    setCurrent(step);
  };

  return (
    <div className={styles.wrapper}>
      <StepperUI currentStep={current} totalSteps={args.totalSteps} onStepClick={handleStepClick} />
      <div className={styles.blocks}>
        <div className={styles.block}>
          <AuthPanelUI
            actionText="Далее"
            onAction={() => {}}
            onGoogleClick={() => {}}
            onAppleClick={() => {}}
            errorText=""
            showRegisterLink={false}
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
              helperText="Пароль должен содержать не менее 8 знаков"
              value={password}
              onChange={handlePasswordChange}
            />
          </AuthPanelUI>
        </div>
        <div className={styles.block}>
          <IllustrationBlockUI
            illustration={<LightBulbIllustration />}
            title="Добро пожаловать в SkillSwap!"
            description="Присоединяйтесь к SkillSwap и обменивайтесь знаниями и навыками с другими людьми"
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
