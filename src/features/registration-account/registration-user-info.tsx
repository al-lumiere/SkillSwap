import { FC } from 'react';
import { AuthPanelUI } from '@components/auth-panel-ui';
import { InputUI } from '@ui/input';
import { RegistrationAccountUIProps } from './type';

export const RegistrationAccountUI: FC<RegistrationAccountUIProps> = ({ isLoading, localDraft, onField, errors }) => (
  <AuthPanelUI
    onGoogleClick={() => console.info('Google OAuth: заглушка')}
    onAppleClick={() => console.info('Apple OAuth: заглушка')}
    showRegisterLink={false}
  >
    <InputUI
      label="Email"
      name="register-email"
      type="email"
      placeholder="Введите email"
      value={localDraft.email ?? ''}
      onChange={onField('email')}
      disabled={isLoading}
      errorText={errors?.email}
      hasError={Boolean(errors?.email)}
    />

    <InputUI
      label="Пароль"
      name="register-password"
      type="password"
      placeholder="Введите ваш пароль"
      helperText="Пароль должен содержать не менее 8 знаков"
      value={localDraft.password ?? ''}
      onChange={onField('password')}
      disabled={isLoading}
      errorText={errors?.password}
      hasError={Boolean(errors?.password)}
    />
  </AuthPanelUI>
);
