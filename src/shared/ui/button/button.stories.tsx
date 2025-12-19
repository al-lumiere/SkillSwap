import type { Meta, StoryObj } from '@storybook/react-vite';
import { ButtonUI } from './button';
import CrossIcon from '../../assets/icons/cross-icon';

const meta: Meta<typeof ButtonUI> = {
  title: 'ui/ButtonUI',
  component: ButtonUI,
  args: {
    text: 'Button',
    variant: 'primary',
    disabled: false,
  },
  argTypes: {
    text: { control: 'text' },
    variant: {
      control: 'radio',
      options: ['primary', 'secondary', 'tertiary'],
    },
    disabled: { control: 'boolean' },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof ButtonUI>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    text: 'Primary',
    disabled: false,
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    text: 'Secondary',
    disabled: true,
  },
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    text: 'Пример tertiary',
  },
};

export const TertiaryIcon: Story = {
  args: {
    variant: 'tertiary',
    text: 'Tertiary',
    icon: <CrossIcon />,
  },
};
