import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { RadioGroupUI } from './index';
import type { RadioGroupUIProps } from './type';

const meta: Meta<typeof RadioGroupUI> = {
  title: 'ui/RadioGroupUI',
  component: RadioGroupUI,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Опциональный заголовок группы радиокнопок',
    },
    options: {
      control: 'object',
      description: 'Массив опций для отображения',
    },
    value: {
      control: 'text',
      description: 'Текущее выбранное значение',
    },
    name: {
      control: 'text',
      description: 'Имя группы радиокнопок',
    },
    onChange: {
      description: 'Колбэк при изменении значения',
    },
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroupUI>;

// Wrapper component with state management
const RadioGroupWithState = ({ value: initialValue, onChange, title, options, name }: RadioGroupUIProps) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (newValue: string) => {
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return <RadioGroupUI value={value} onChange={handleChange} title={title} options={options} name={name} />;
};

export const WithTitle: Story = {
  render: (args) => (
    <RadioGroupWithState
      title={args.title}
      options={args.options}
      value={args.value}
      onChange={args.onChange}
      name={args.name}
    />
  ),
  args: {
    title: 'Пол автора',
    options: [
      { value: 'not-specified', label: 'Не имеет значения' },
      { value: 'male', label: 'Мужской' },
      { value: 'female', label: 'Женский' },
    ],
    value: 'not-specified',
    name: 'gender',
  },
};

export const WithoutTitle: Story = {
  render: (args) => (
    <RadioGroupWithState
      title={args.title}
      options={args.options}
      value={args.value}
      onChange={args.onChange}
      name={args.name}
    />
  ),
  args: {
    options: [
      { value: 'all', label: 'Всё' },
      { value: 'want-to-learn', label: 'Хочу научиться' },
      { value: 'can-teach', label: 'Могу научить' },
    ],
    value: 'all',
    name: 'learning-status',
  },
};

export const ThreeOptions: Story = {
  render: (args) => (
    <RadioGroupWithState
      title={args.title}
      options={args.options}
      value={args.value}
      onChange={args.onChange}
      name={args.name}
    />
  ),
  args: {
    title: 'Выберите уровень',
    options: [
      { value: 'beginner', label: 'Начинающий' },
      { value: 'intermediate', label: 'Средний' },
      { value: 'advanced', label: 'Продвинутый' },
    ],
    value: 'beginner',
    name: 'level',
  },
};

export const ManyOptions: Story = {
  render: (args) => (
    <RadioGroupWithState
      title={args.title}
      options={args.options}
      value={args.value}
      onChange={args.onChange}
      name={args.name}
    />
  ),
  args: {
    title: 'Выберите язык программирования',
    options: [
      { value: 'javascript', label: 'JavaScript' },
      { value: 'typescript', label: 'TypeScript' },
      { value: 'python', label: 'Python' },
      { value: 'java', label: 'Java' },
      { value: 'csharp', label: 'C#' },
      { value: 'go', label: 'Go' },
    ],
    value: 'typescript',
    name: 'language',
  },
};
