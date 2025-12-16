import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, useEffect } from 'react';
import { CheckboxGroupUI } from './checkbox-group';
import { CheckboxItemUI } from '../checkbox-item';

const meta: Meta<typeof CheckboxGroupUI> = {
  title: 'shared/ui/CheckboxGroup',
  component: CheckboxGroupUI,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: { control: 'text' },
    expanded: { control: 'boolean' },
    onToggleExpand: { action: 'toggled' },
  },
};

export default meta;

type Story = StoryObj<typeof CheckboxGroupUI>;

const InteractiveTemplate = ({ label, expanded: initialExpanded }: Parameters<typeof CheckboxGroupUI>[0]) => {
  const [expanded, setExpanded] = useState(initialExpanded || false);

  // Sync state when initialExpanded changes (for Storybook controls)
  useEffect(() => {
    setExpanded(initialExpanded || false);
  }, [initialExpanded]);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <CheckboxGroupUI label={label} expanded={expanded} onToggleExpand={handleToggle}>
      <CheckboxItemUI label="Первый пункт" checked={false} onChange={() => {}} />
      <CheckboxItemUI label="Второй пункт" checked onChange={() => {}} />
      <CheckboxItemUI label="Третий пункт" checked={false} onChange={() => {}} />
    </CheckboxGroupUI>
  );
};

export const Collapsed: Story = {
  render: InteractiveTemplate,
  args: {
    label: 'Группа чекбоксов',
    expanded: false,
    onToggleExpand: () => {},
    children: null,
  },
};

export const Expanded: Story = {
  render: InteractiveTemplate,
  args: {
    label: 'Группа чекбоксов',
    expanded: true,
    onToggleExpand: () => {},
    children: null,
  },
};

export const WithCustomLabel: Story = {
  render: InteractiveTemplate,
  args: {
    label: 'Навыки программирования',
    expanded: false,
    onToggleExpand: () => {},
    children: null,
  },
};
