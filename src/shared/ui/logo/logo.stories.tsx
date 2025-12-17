import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import { Logo } from './logo';

const meta: Meta<typeof Logo> = {
  title: 'shared/ui/Logo',
  component: Logo,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  args: {
    to: '/',
  },
  argTypes: {
    to: { control: 'text' },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof Logo>;

export const Primary: Story = {};


