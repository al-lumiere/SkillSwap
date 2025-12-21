import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import { LogoUI } from './logo';

const meta: Meta<typeof LogoUI> = {
  title: 'ui/Logo',
  component: LogoUI,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof LogoUI>;

export const Primary: Story = {};
