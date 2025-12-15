import type { Meta, StoryObj } from '@storybook/react-vite';
import MoonIcon from '../../assets/icons/moon-icon';
import NotificationIcon from '../../assets/icons/notification-icon';
import LikeIcon from '../../assets/icons/like-icon';
import { IconButtonUI } from './icon-button';

const meta: Meta<typeof IconButtonUI> = {
  title: 'shared/ui/IconButton',
  component: IconButtonUI,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onClick: { action: 'clicked' },
  },
};

export default meta;

type Story = StoryObj<typeof IconButtonUI>;

export const MoonIconButton: Story = {
  args: {
    children: <MoonIcon />,
    onClick: () => {},
  },
};

export const NotificationIconButton: Story = {
  args: {
    children: <NotificationIcon />,
    onClick: () => {},
  },
};

export const LikeIconButton: Story = {
  args: {
    children: <LikeIcon />,
    onClick: () => {},
  },
};
