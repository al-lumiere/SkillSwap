import type { Meta, StoryObj } from '@storybook/react-vite';
import DoneIcon from '@icons/done-icon';
import NotificationIcon from '@icons/notification-icon';
import { ActionResultUI } from './action-result';

const meta: Meta<typeof ActionResultUI> = {
  title: 'UI/ActionResultUI',
  component: ActionResultUI,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof ActionResultUI>;

export const Done: Story = {
  args: {
    title: 'Ваше предложение создано',
    description: 'Теперь вы можете предложить обмен',
    icon: <DoneIcon />,
    buttonText: 'Готово',
    buttonOnClick: () => {},
  },
  decorators: [
    (Story) => (
      <div style={{ width: '556px', padding: '80px 60px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Notification: Story = {
  args: {
    title: 'Вы предложили обмен',
    description: 'Теперь дождитесь подтверждения. Вам придёт уведомление',
    icon: <NotificationIcon />,
    buttonText: 'Готово',
    buttonOnClick: () => {},
  },
  decorators: [
    (Story) => (
      <div style={{ width: '556px', padding: '80px 60px' }}>
        <Story />
      </div>
    ),
  ],
};
