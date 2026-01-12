import type { ChangeEvent, FC, FormEvent } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from '@store/store';
import { loginUserThunk } from '@slices/auth/userSlice';
// import styles from './login.module.css';

type LoginForm = {
  email: string;
  password: string;
};

export const LoginPage: FC = () => {
  const dispatch = useDispatch();

  const { status, error } = useSelector((s) => s.user);
  const isLoading = status === 'loading';

  const [form, setForm] = useState<LoginForm>({ email: '', password: '' });
  const [localError, setLocalError] = useState<string | null>(null);

  const onField = (field: keyof LoginForm) => (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setForm((prev) => ({ ...prev, [field]: value }));
    setLocalError(null);
  };

  const validate = (): boolean => {
    if (!form.email.trim()) {
      setLocalError('Введите email');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setLocalError('Неверный формат email');
      return false;
    }
    if (!form.password.trim()) {
      setLocalError('Введите пароль');
      return false;
    }
    return true;
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    dispatch(
      loginUserThunk({
        email: form.email.trim(),
        password: form.password,
      }),
    );
  };

  return (
    <div>
      <h1>Вход</h1>

      {(localError || error) && <div>{localError || error}</div>}

      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="login-email">
            Email
            <input
              id="login-email"
              type="email"
              value={form.email}
              onChange={onField('email')}
              autoComplete="email"
              disabled={isLoading}
            />
          </label>
        </div>

        <div>
          <label htmlFor="login-password">
            Пароль
            <input
              id="login-password"
              type="password"
              value={form.password}
              onChange={onField('password')}
              autoComplete="current-password"
              disabled={isLoading}
            />
          </label>
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Входим…' : 'Войти'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
