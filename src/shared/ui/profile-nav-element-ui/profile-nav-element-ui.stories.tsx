import type { Meta, StoryObj } from '@storybook/react-vite';
import RequestIcon from '@icons/request-icon';
import UserIcon from '@icons/user-icon';
import { ProfileNavElementUI } from './profile-nav-element-ui';

const meta: Meta<typeof ProfileNavElementUI> = {
  title: 'shared/ProfileNavElementUI',
  component: ProfileNavElementUI,
  argTypes: {
    text: { control: 'text' },
    isActive: { control: 'boolean' },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof ProfileNavElementUI>;

export const Default: Story = {
  args: {
    text: 'Заявки',
    icon: <RequestIcon />,
  },
};

export const Active: Story = {
  args: {
    text: 'Личные данные',
    icon: <UserIcon />,
    isActive: true,
  },
};
