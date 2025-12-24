import type { Meta, StoryObj } from '@storybook/react-vite';
import { CardActionsUI } from './card-actions';

const meta: Meta<typeof CardActionsUI> = {
  title: 'ui/CardActionsUI',
  component: CardActionsUI,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onLikeClick: { action: 'liked' },
    onShareClick: { action: 'shared' },
    onMoreClick: { action: 'more options' },
  },
};

export default meta;
type Story = StoryObj<typeof CardActionsUI>;

export const Default: Story = {
  args: {
    isLiked: false,
  },
};

export const Liked: Story = {
  args: {
    isLiked: true, // Демонстрация активного состояния (сердечко будет нажато)
  },
};
