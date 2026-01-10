import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { City } from '@api/types';
import { SearchSelectUI } from './registration-search';

const CITIES: City[] = [
  { id: 1, slug: 'moskva', name: 'Москва' },
  { id: 2, slug: 'sankt-peterburg', name: 'Санкт-Петербург' },
  { id: 3, slug: 'kazan', name: 'Казань' },
  { id: 4, slug: 'yekaterinburg', name: 'Екатеринбург' },
  { id: 5, slug: 'novosibirsk', name: 'Новосибирск' },
  { id: 6, slug: 'nizhniy-novgorod', name: 'Нижний Новгород' },
  { id: 7, slug: 'samara', name: 'Самара' },
  { id: 8, slug: 'rostov-na-donu', name: 'Ростов-на-Дону' },
  { id: 9, slug: 'krasnoyarsk', name: 'Красноярск' },
  { id: 10, slug: 'vladivostok', name: 'Владивосток' },
];

const meta: Meta<typeof SearchSelectUI> = {
  title: 'ui/SearchSelectUI',
  component: SearchSelectUI,
  parameters: {
    layout: 'centered',
  },
  args: {
    label: 'Город',
    placeholder: 'Не указан',
    options: CITIES,
  },
};

export default meta;
type Story = StoryObj<typeof SearchSelectUI>;

export const Default: Story = {
  render: (args) => {
    const [isOpen, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [selected, setSelected] = useState<City | null>(null);

    const handleSelect = (city: City) => {
      setSelected(city);
      setOpen(false);
      setQuery('');
    };

    return (
      <div style={{ width: 436 }}>
        <SearchSelectUI
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...args}
          value={selected?.name}
          isOpen={isOpen}
          handleToggle={() => setOpen(true)}
          onClose={() => {
            setOpen(false);
            setQuery('');
          }}
          query={query}
          handleQueryChange={setQuery}
          handleClear={() => setQuery('')}
          onSelect={handleSelect}
        />
      </div>
    );
  },
};
