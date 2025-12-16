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
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    'item-1': false,
    'item-2': true,
    'item-3': false,
  });

  // Sync state when initialExpanded changes (for Storybook controls)
  useEffect(() => {
    setExpanded(initialExpanded || false);
  }, [initialExpanded]);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const handleItemToggle = (id: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <CheckboxGroupUI label={label} expanded={expanded} onToggleExpand={handleToggle}>
      <CheckboxItemUI
        label="Первый пункт"
        checked={checkedItems['item-1']}
        onChange={() => handleItemToggle('item-1')}
      />
      <CheckboxItemUI
        label="Второй пункт"
        checked={checkedItems['item-2']}
        onChange={() => handleItemToggle('item-2')}
      />
      <CheckboxItemUI
        label="Третий пункт"
        checked={checkedItems['item-3']}
        onChange={() => handleItemToggle('item-3')}
      />
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

export const WithContainer: Story = {
  render: ({ label, expanded: initialExpanded }) => {
    const [expanded, setExpanded] = useState(initialExpanded || false);
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
      'item-1': false,
      'item-2': true,
      'item-3': false,
      'item-4': false,
    });

    useEffect(() => {
      setExpanded(initialExpanded || false);
    }, [initialExpanded]);

    const handleToggle = () => {
      setExpanded(!expanded);
    };

    const handleItemToggle = (id: string) => {
      setCheckedItems((prev) => ({
        ...prev,
        [id]: !prev[id],
      }));
    };

    return (
      <div
        style={{
          width: '400px',
          padding: '10px',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          backgroundColor: 'var(--background-color,rgb(237, 237, 237))',
        }}
      >
        <CheckboxGroupUI label={label} expanded={expanded} onToggleExpand={handleToggle}>
          <CheckboxItemUI
            label="JavaScript"
            checked={checkedItems['item-1']}
            onChange={() => handleItemToggle('item-1')}
          />
          <CheckboxItemUI
            label="TypeScript"
            checked={checkedItems['item-2']}
            onChange={() => handleItemToggle('item-2')}
          />
          <CheckboxItemUI label="Python" checked={checkedItems['item-3']} onChange={() => handleItemToggle('item-3')} />
          <CheckboxItemUI label="Java" checked={checkedItems['item-4']} onChange={() => handleItemToggle('item-4')} />
        </CheckboxGroupUI>
      </div>
    );
  },
  args: {
    label: 'Языки программирования',
    expanded: true,
    onToggleExpand: () => {},
    children: null,
  },
};
