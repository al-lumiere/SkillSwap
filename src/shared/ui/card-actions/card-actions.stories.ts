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
    onFavoriteToggle: { action: 'toggle favorite' },
    onShareClick: { action: 'shared' },
    onMoreClick: { action: 'more options' },
    isFavorite: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof CardActionsUI>;

export const Default: Story = {
  args: {
    isFavorite: false,
  },
};

export const Favorited: Story = {
  args: {
    isFavorite: true, // Демонстрация активного состояния (сердечко будет нажато)
  },
};
