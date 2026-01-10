import type { Meta, StoryObj } from '@storybook/react-vite';
import { useMemo, useState } from 'react';
import { SingleselectUI } from './registration-singleselect';
import type { SingleselectUIProps } from './type';

type GenderId = 'any' | 'male' | 'female';

const OPTIONS: { id: GenderId; label: string }[] = [
  { id: 'any', label: 'Не выбран' },
  { id: 'male', label: 'Мужской' },
  { id: 'female', label: 'Женский' },
];

const meta: Meta<typeof SingleselectUI> = {
  title: 'ui/SingleselectUI',
  component: SingleselectUI,
  parameters: {
    layout: 'centered',
  },
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
    selectedId: { control: false },
    onSelect: { action: 'select' },
    onClose: { action: 'close' },
    handleToggle: { action: 'toggle' },
  },
};

export default meta;
type Story = StoryObj<typeof SingleselectUI>;

export const Interactive: Story = {
  render: (args) => {
    const [isOpen, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<GenderId>('any');

    const value = useMemo(() => OPTIONS.find((o) => o.id === selectedId)?.label, [selectedId]);

    return (
      <div style={{ width: 240 }}>
        <SingleselectUI
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...args}
          isOpen={isOpen}
          onClose={() => setOpen(false)}
          handleToggle={() => setOpen((v) => !v)}
          options={OPTIONS}
          selectedId={selectedId}
          value={value}
          onSelect={(id) => {
            setSelectedId(id);
            setOpen(false);
          }}
        />
      </div>
    );
  },
  args: {
    label: 'Пол',
    placeholder: 'Не выбран',
    placement: 'bottom-start',
    offset: -1,
    matchWidth: true,
    maxWidth: null,
  } satisfies Partial<SingleselectUIProps>,
};
