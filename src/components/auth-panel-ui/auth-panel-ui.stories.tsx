import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, type ChangeEvent } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { InputUI } from '@ui/input-ui';
import { AuthPanelUI } from './auth-panel-ui';

const meta: Meta<typeof AuthPanelUI> = {
  title: 'ui/AuthPanelUI',
  component: AuthPanelUI,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof AuthPanelUI>;

const FormTemplate = ({
  actionText,
  errorText,
  showRegisterLink,
}: {
  actionText: string;
  errorText: string;
  showRegisterLink: boolean;
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div style={{ width: 560, padding: 24, background: 'white' }}>
      <AuthPanelUI
        actionText={actionText}
        onAction={() => {}}
        onGoogleClick={() => {}}
        onAppleClick={() => {}}
        errorText={errorText}
        showRegisterLink={showRegisterLink}
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
  );
};

export const Login: Story = {
  render: () => (
    <FormTemplate
      actionText="Войти"
      errorText="Email или пароль введён неверно. Пожалуйста проверьте правильность введённых данных"
      showRegisterLink
    />
  ),
};

export const RegisterStep1: Story = {
  render: () => (
    <div style={{ width: 560, padding: 24, background: 'white' }}>
      <AuthPanelUI
        actionText="Далее"
        onAction={() => {}}
        onGoogleClick={() => {}}
        onAppleClick={() => {}}
        showRegisterLink={false}
      >
        <InputUI label="Email" name="email" type="email" placeholder="Введите email" value="" onChange={() => {}} />
        <InputUI
          label="Пароль"
          name="password"
          type="password"
          placeholder="Придумайте надёжный пароль"
          value=""
          onChange={() => {}}
          helperText="Пароль должен содержать не менее 8 знаков"
        />
      </AuthPanelUI>
    </div>
  ),
};
