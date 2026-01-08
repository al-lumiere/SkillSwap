import { useState, FC } from 'react';
import { GenderListUI } from '@ui/gender-list/gender-list';
import { PopoverUI } from '@ui/popover';
import { SelectUI } from '@ui/select';
import { GENDER_OPTIONS, GenderId } from './constants';

export const SelectGender: FC = () => {
  const [isOpen, setOpen] = useState(false);
  const [genderId, setGenderId] = useState<GenderId>('any');

  const handleSelect = (id: GenderId) => {
    console.log(`Выбранный пол: ${id}`);
    setOpen(false);
    setGenderId(id);
  };

  const selectedValue = GENDER_OPTIONS.find((item) => item.id === genderId)?.label;

  return (
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
  );
};
