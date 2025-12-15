import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { CheckboxItemUI } from './checkbox-item';

const meta: Meta<typeof CheckboxItemUI> = {
  title: 'shared/ui/CheckboxItem',
  component: CheckboxItemUI,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: { control: 'text' },
    checked: { control: 'boolean' },
    onChange: { action: 'changed' },
  },
};

export default meta;

type Story = StoryObj<typeof CheckboxItemUI>;

const InteractiveTemplate = ({ label, checked: initialChecked }: Parameters<typeof CheckboxItemUI>[0]) => {
  const [checked, setChecked] = useState(initialChecked || false);
  return <CheckboxItemUI label={label} checked={checked} onChange={() => setChecked(!checked)} />;
};

export const Unchecked: Story = {
  render: InteractiveTemplate,
  args: {
    label: 'Невыбранный чекбокс',
    checked: false,
    onChange: () => {},
  },
};

export const Checked: Story = {
  render: InteractiveTemplate,
  args: {
    label: 'Выбранный чекбокс',
    checked: true,
    onChange: () => {},
  },
};
