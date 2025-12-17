import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextTagUI } from './text-tag';

const meta: Meta<typeof TextTagUI> = {
  title: 'UI/TextTagUI',
  component: TextTagUI,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: { control: 'text' },
    bgColor: { control: 'color' },
  },
};

export default meta;

type Story = StoryObj<typeof TextTagUI>;

export const ArtTag: Story = {
  args: {
    label: 'Игра на барабанах',
    bgColor: '#f7e7f2',
  },
};

export const HealthTag: Story = {
  args: {
    label: 'Медитация',
    bgColor: '#e9f7e7',
  },
};
