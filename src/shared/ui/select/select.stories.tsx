import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { PopoverUI } from '@ui/popover';
import { GenderListUI } from '@ui/gender-list/gender-list';
import { GENDER_OPTIONS, GenderId } from '@features/select-gender/constants';
import { SelectUI } from './select';

const meta: Meta<typeof SelectUI> = {
  title: 'ui/SelectUI',
  component: SelectUI,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Заголовок над селектом',
    },
    placeholder: {
      control: 'text',
      description: 'Текст-плейсхолдер, пока не выбрано значение',
    },
    value: {
      control: 'text',
      description: 'Выбранная опция внутри списка',
    },
    isOpen: {
      control: 'boolean',
      description: 'Флаг, на основе которого передаются рендериться поповер с контейнером или нет',
    },
    handleToggle: {
      action: 'toggle',
      description: 'Открывает или закрывает поповер с контентом',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SelectUI>;

export const SelectExample: Story = {
  render: () => {
    const [isOpen, setOpen] = useState(false);
    const [genderId, setGenderId] = useState<GenderId>('any');

    const handleSelect = (id: GenderId) => {
      console.log(`Выбранный пол: ${id}`);
      setOpen(false);
      setGenderId(id);
    };

    const selectedValue = GENDER_OPTIONS.find((item) => item.id === genderId)?.label;

    return (
      <div style={{ width: '208px' }}>
        <PopoverUI
          isOpen={isOpen}
          onClose={() => setOpen(!isOpen)}
          anchor={
            <SelectUI
              isOpen={isOpen}
              placeholder="Не выбран"
              label="Пол"
              handleToggle={() => setOpen((v) => !v)}
              value={selectedValue}
            />
          }
          placement="bottom-start"
          offset={-1}
          matchWidth
        >
          <GenderListUI options={GENDER_OPTIONS} selectedValueId={genderId} onSelect={handleSelect} />
        </PopoverUI>
      </div>
    );
  },
};
