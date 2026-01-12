import { useState, type ChangeEvent, type FC, type MouseEventHandler } from 'react';

import { useDispatch, useSelector } from '@store/store';
import { loginUserThunk } from '@slices/auth/userSlice';
import { AuthPanelUI } from '@components/auth-panel-ui';
import { InputUI } from '@ui/input';

type LoginForm = {
  email: string;
  password: string;
};

type FieldErrors = Partial<Record<keyof LoginForm, string>>;

export const LoginAuthPanel: FC = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((s) => s.user);
  const isLoading = status === 'loading';

  const [form, setForm] = useState<LoginForm>({ email: '', password: '' });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);

  const onField = (field: keyof LoginForm) => (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setForm((prev) => ({ ...prev, [field]: value }));

    setFieldErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });

    setFormError(null);
  };

  const validate = (): boolean => {
    const nextErrors: FieldErrors = {};
    const email = form.email.trim();

    if (!email) nextErrors.email = 'Введите email';
    else if (!/\S+@\S+\.\S+/.test(email)) nextErrors.email = 'Неверный формат email';

    if (!form.password.trim()) nextErrors.password = 'Введите пароль';

    setFieldErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const onSubmit: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    if (!validate()) return;

    try {
      await dispatch(
        loginUserThunk({
          email: form.email.trim(),
          password: form.password,
        }),
      ).unwrap();
    } catch (err) {
      let msg = 'Не удалось войти';

      if (typeof err === 'string') {
        msg = err;
      } else if (typeof error === 'string') {
        msg = error;
      }

      setFormError(msg);
    }
  };

  return (
    <AuthPanelUI
      actionText={isLoading ? 'Входим…' : 'Войти'}
      onAction={onSubmit}
      onGoogleClick={() => {}}
      onAppleClick={() => {}}
      errorText={formError ?? ''}
      showRegisterLink
    >
      <InputUI
        label="Email"
        name="login-email"
        type="email"
        placeholder="Введите email"
        value={form.email}
        onChange={onField('email')}
        errorText={fieldErrors.email}
      />
      <InputUI
        label="Пароль"
        name="login-password"
        type="password"
        placeholder="Введите ваш пароль"
        value={form.password}
        onChange={onField('password')}
        errorText={fieldErrors.password}
      />
    </AuthPanelUI>
  );
};
