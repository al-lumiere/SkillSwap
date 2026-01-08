import type { Meta, StoryObj } from '@storybook/react-vite';
import CrossIcon from '@icons/cross-icon';
import PencilIcon from '@icons/pencil-icon';
import ClockIcon from '@icons/clock-icon';
import { ButtonUI } from './button';

const iconsMap = {
  None: null,
  Cross: <CrossIcon />,
  Pencil: <PencilIcon />,
  Clock: <ClockIcon />,
};

const meta: Meta<typeof ButtonUI> = {
  title: 'ui/ButtonUI',
  component: ButtonUI,
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
    isWide: {
      control: 'boolean',
      options: [true, false],
      defaultValue: false,
      description: 'В ширину родителя',
    },
    disabled: { control: 'boolean' },
    iconLeft: {
      control: 'select',
      options: Object.keys(iconsMap),
      mapping: iconsMap,
    },
    iconRight: {
      control: 'select',
      options: Object.keys(iconsMap),
      mapping: iconsMap,
    },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof ButtonUI>;

export const SecondaryWithEditIcon: Story = {
  args: {
    variant: 'secondary',
    children: 'Редактировать',
    iconRight: 'Pencil', //
  },
};

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Готово',
  },
};

export const WithinContainer: Story = {
  args: {
    variant: 'primary',
    children: 'Готово',
    isWide: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px', display: 'flex', justifyContent: 'center' }}>
        <Story />
      </div>
    ),
  ],
};
