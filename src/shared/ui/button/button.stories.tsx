import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './button';
import CrossIcon from '../../assets/icons/cross-icon';

const meta: Meta<typeof Button> = {
  title: 'ui/Button',
  component: Button,
  args: {
    children: 'Button',
    variant: 'primary',
    disabled: false,
  },
  argTypes: {
    children: { control: 'text' },
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

type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary',
    disabled: false,
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary',
    disabled: true,
  },
};

export const Tertiary: Story = {
  args: {
    variant: 'tertiary',
    children: 'Пример tertiary',
  },
};

export const TertiaryIconLeft: Story = {
  args: {
    variant: 'tertiary',
    children: (
      <>
        <CrossIcon />
        Tertiary
      </>
    ),
  },
};

export const TertiaryIconRight: Story = {
  args: {
    variant: 'tertiary',
    children: (
      <>
        Tertiary
        <CrossIcon />
      </>
    ),
  },
};
