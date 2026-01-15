import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import RequestIcon from '@icons/request-icon';
import UserIcon from '@icons/user-circle-icon';
import { ProfileNavElementUI } from './profile-nav-element-ui';

const meta: Meta<typeof ProfileNavElementUI> = {
  title: 'UI/ProfileNavElementUI',
  component: ProfileNavElementUI,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story, ctx) => (
      <MemoryRouter initialEntries={[ctx.args.to || '/']}>
        <div style={{ width: '320px' }}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
  argTypes: {
    text: { control: 'text' },
    to: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof ProfileNavElementUI>;

export const Default: Story = {
  args: {
    text: 'Заявки',
    icon: <RequestIcon />,
    to: '/',
  },
};

export const Active: Story = {
  args: {
    text: 'Личные данные',
    icon: <UserIcon />,
    to: '/',
  },
  parameters: {
    docs: {
      description: {},
    },
  },
};
