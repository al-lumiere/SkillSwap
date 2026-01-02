import type { Meta, StoryObj } from '@storybook/react-vite';
import { CalendarUI } from './calendar';

const meta: Meta<typeof CalendarUI> = {
  title: 'UI/CalendarUI',
  component: CalendarUI,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof CalendarUI>;

export const Primary: Story = {
  args: {
    selectedDate: new Date(2000, 3, 27),
  },
};
