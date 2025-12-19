import type { Meta, StoryObj } from '@storybook/react-vite';
import { GuestUserPanelUI } from './user-guest';

const meta: Meta<typeof GuestUserPanelUI> = {
  title: 'ui/GuestUserPanel',
  component: GuestUserPanelUI,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onLogin: { action: 'login clicked' },
    onSignup: { action: 'signup clicked' },
  },
};

export default meta;

// кнопки реализованы флексбоксом, и он тянется на всю доступную ширину. если вставить эту группу кнопок в хедер, то они сожмуться. для примера в module.css можно раскомментировать свойтсво width и посмотреть

export const LoginButton: StoryObj = {
  args: {
    variant: 'secondary',
    text: 'Войти',
  },
};

export const SignupButton: StoryObj = {
  args: {
    variant: 'primary',
    text: 'Зарегестрироваться',
  },
};
