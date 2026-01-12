import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, useMemo } from 'react';
import { MultiselectUI } from './registration-multiselect';
import type { MultiselectUIProps, MultiselectOption } from './type';

const OPTIONS: MultiselectOption[] = [
  { id: 1, label: 'Спорт' },
  { id: 2, label: 'Музыка' },
  { id: 3, label: 'Языки' },
  { id: 4, label: 'Программирование' },
];

const meta: Meta<typeof MultiselectUI> = {
  title: 'ui/MultiselectUI',
  component: MultiselectUI,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    value: { control: 'text' },

    isOpen: { control: 'boolean' },
    placement: { control: 'radio', options: ['bottom-start', 'bottom-end'] },
    offset: { control: 'number' },
    matchWidth: { control: 'boolean' },
    maxWidth: { control: 'number' },

    options: { control: false },
    selectedIds: { control: false },
    onOptionChange: { action: 'optionChange' },
    handleToggle: { action: 'toggle' },
    onClose: { action: 'close' },
  },
};

export default meta;
type Story = StoryObj<typeof MultiselectUI>;

export const Interactive: Story = {
  render: (args) => {
    const [isOpen, setOpen] = useState(false);
    const [selectedIds, setSelectedIds] = useState<number[]>([2, 4]);

    const value = useMemo(
      () => (selectedIds.length ? `Выбрано: ${selectedIds.length}` : undefined),
      [selectedIds.length],
    );

    const handleToggle = () => setOpen((v) => !v);
    const onClose = () => setOpen(false);

    const onOptionChange = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
      const { checked } = e.target;

      setSelectedIds((prev) => (checked ? [...prev, id] : prev.filter((x) => x !== id)));
    };

    return (
      <div style={{ width: 436 }}>
        <MultiselectUI
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...args}
          isOpen={isOpen}
          handleToggle={handleToggle}
          onClose={onClose}
          options={OPTIONS}
          selectedIds={selectedIds}
          value={value}
          onOptionChange={onOptionChange}
        />
      </div>
    );
  },
  args: {
    label: 'Категория навыка, которому хотите научиться',
    placeholder: 'Выберите категорию',
    placement: 'bottom-start',
    offset: -1,
    matchWidth: true,
    maxWidth: null,
  } satisfies Partial<MultiselectUIProps>,
};
