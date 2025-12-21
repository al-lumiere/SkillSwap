import type { Meta, StoryObj } from '@storybook/react-vite';
import MoonIcon from '@icons/moon-icon';
import NotificationIcon from '@icons/notification-icon';
import LikeIcon from '@icons/like-icon';
import { IconButtonUI } from './icon-button';

const meta: Meta<typeof IconButtonUI> = {
  title: 'ui/IconButtonUI',
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
