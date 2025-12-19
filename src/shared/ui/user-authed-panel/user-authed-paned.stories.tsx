import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconButtonUI } from '@ui/icon-button';
import { UserAuthedPanelUI } from './user-authed-panel';
import NotificationIcon from '../../assets/icons/notification-icon';
import LikeIcon from '../../assets/icons/like-icon';

const meta: Meta<typeof UserAuthedPanelUI> = {
  title: 'UI/UserAuthedPanelUI',
  component: UserAuthedPanelUI,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    userName: {
      control: 'text',
      description: 'Имя пользователя',
    },
    avatarUrl: {
      control: 'text',
      description: 'URL аватара',
    },
    onUserClick: {
      action: 'user clicked',
      description: 'Клик по кнопке аватка + имя',
    },
    actions: {
      control: false,
      description: 'кнопки IconButtonUI',
    },
  },
};

export default meta;

type Story = StoryObj<typeof UserAuthedPanelUI>;

export const AuthedUser: Story = {
  args: {
    userName: 'Рик Санчез',
    avatarUrl: '../../assets/icons/user-circle-icon',
    actions: (
      <>
        <IconButtonUI onClick={() => {}}>
          <NotificationIcon />
        </IconButtonUI>
        <IconButtonUI onClick={() => {}}>
          <LikeIcon />
        </IconButtonUI>
      </>
    ),
  },
};
