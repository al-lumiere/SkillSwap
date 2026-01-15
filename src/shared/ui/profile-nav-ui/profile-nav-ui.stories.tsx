import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import RequestIcon from '@icons/request-icon';
import MessageTextIcon from '@icons/message-text-icon';
import LikeIcon from '@icons/like-icon';
import IdeaIcon from '@icons/idea-icon';
import UserIcon from '@icons/user-icon';
import { ProfileNavUI } from './profile-nav-ui';
import { ProfileNavElementUI } from '../profile-nav-element-ui';

const meta: Meta<typeof ProfileNavUI> = {
  title: 'UI/ProfileNavUI',
  component: ProfileNavUI,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/']}>
        <div style={{ width: '320px' }}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ProfileNavUI>;

export const Default: Story = {
  args: {
    items: [
      {
        id: '1',
        element: <ProfileNavElementUI text="Заявки" icon={<RequestIcon />} to="/profile/requests" />,
      },
      {
        id: '2',
        element: <ProfileNavElementUI text="Мои обмены" icon={<MessageTextIcon />} to="/profile/exchanges" />,
      },
      {
        id: '3',
        element: <ProfileNavElementUI text="Избранное" icon={<LikeIcon />} to="/profile/favorites" />,
      },
      {
        id: '4',
        element: <ProfileNavElementUI text="Мои навыки" icon={<IdeaIcon />} to="/profile/skills" />,
      },
      {
        id: '5',
        element: <ProfileNavElementUI text="Личные данные" icon={<UserIcon />} to="/profile" end />,
      },
    ],
  },
};
