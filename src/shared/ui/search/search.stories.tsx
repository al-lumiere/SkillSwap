import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { SearchUI } from './search';
import { TSearchInputProps } from './type';

const meta: Meta<typeof SearchUI> = {
  title: 'ui/SearchUI',
  component: SearchUI,
};

export default meta;

type Story = StoryObj<typeof SearchUI>;

const InteractiveTemplate = ({ value: initialValue, placeholder }: TSearchInputProps) => {
  const [value, setValue] = useState(initialValue || '');
  return <SearchUI placeholder={placeholder} value={value} onChange={setValue} onClear={() => setValue('')} />;
};

export const Empty: Story = {
  render: InteractiveTemplate,
  args: {
    placeholder: 'Искать навык',
  },
};

export const WithText: Story = {
  render: InteractiveTemplate,
  args: {
    placeholder: 'Искать навык',
    value: 'React',
  },
};

export const WithClearButton: Story = {
  render: InteractiveTemplate,
  args: {
    placeholder: 'Искать навык',
    value: 'TypeScript',
  },
};
