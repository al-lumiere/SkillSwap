import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import { GuestUserPanelUI } from './user-guest';

const meta: Meta<typeof GuestUserPanelUI> = {
  title: 'ui/GuestUserPanel',
  component: GuestUserPanelUI,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <MemoryRouter initialEntries={['/']}>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof GuestUserPanelUI>;

export const Default: Story = {};
