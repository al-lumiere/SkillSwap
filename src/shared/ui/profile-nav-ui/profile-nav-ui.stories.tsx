import type { Meta, StoryObj } from '@storybook/react-vite';

import MessageTextIcon from '@icons/message-text-icon';
import RequestIcon from '@icons/request-icon';
import LikeIcon from '@icons/like-icon';
import IdeaIcon from '@icons/idea-icon';
import UserIcon from '@icons/user-icon';

import { ProfileNavElementUI } from '../profile-nav-element-ui';
import { ProfileNavUI } from './profile-nav-ui';

const meta: Meta<typeof ProfileNavUI> = {
  title: 'shared/ProfileNavUI',
  component: ProfileNavUI,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof ProfileNavUI>;

export const Default: Story = {
  args: {
    items: [
      {
        id: '1',
        element: <ProfileNavElementUI text="Заявки" icon={<RequestIcon />} />,
      },
      {
        id: '2',
        element: <ProfileNavElementUI text="Мои обмены" icon={<MessageTextIcon />} />,
      },
      {
        id: '3',
        element: <ProfileNavElementUI text="Избранное" icon={<LikeIcon />} />,
      },
      {
        id: '4',
        element: <ProfileNavElementUI text="Мои навыки" icon={<IdeaIcon />} />,
      },
      {
        id: '5',
        element: <ProfileNavElementUI text="Личные данные" icon={<UserIcon />} isActive />,
      },
    ],
  },
};
