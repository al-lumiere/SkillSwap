import { FC } from 'react';
import { RegistrationAccountUIProps } from './type';

export const RegistrationAccountUI: FC<RegistrationAccountUIProps> = ({ isLoading, localDraft, onField }) => (
  <div>
    <button type="button" onClick={() => console.info('Google OAuth: заглушка')} disabled={isLoading}>
      Продолжить с Google
    </button>

    <button type="button" onClick={() => console.info('Apple OAuth: заглушка')} disabled={isLoading}>
      Продолжить с Apple
    </button>

    <div>
      <label htmlFor="register-email">
        Email
        <input
          id="register-email"
          type="email"
          value={localDraft.email ?? ''}
          onChange={onField('email')}
          autoComplete="email"
        />
      </label>
    </div>

    <div>
      <label htmlFor="register-password">
        Пароль
        <input
          id="register-password"
          type="password"
          value={localDraft.password ?? ''}
          onChange={onField('password')}
          autoComplete="new-password"
        />
      </label>
    </div>
  </div>
);
