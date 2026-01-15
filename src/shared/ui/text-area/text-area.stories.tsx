import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, type ChangeEvent } from 'react';
import PencilIcon from '@icons/pencil-icon';
import { TextAreaUI } from './text-area';
import type { TTextAreaUIProps } from './type';

const meta: Meta<typeof TextAreaUI> = {
  title: 'ui/TextAreaUI',
  component: TextAreaUI,
};

export default meta;

type Story = StoryObj<typeof TextAreaUI>;

const Template = (args: TTextAreaUIProps) => {
  const {
    label,
    name,
    icon,
    value: initialValue = '',
    placeholder,
    required,
    helperText,
    errorText,
    hasError,
    disabled,
    id,
    rows,
    className,
  } = args;

  const [value, setValue] = useState(initialValue);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  return (
    <div style={{ width: 720, padding: 24, background: 'white' }}>
      <TextAreaUI
        label={label}
        name={name}
        icon={icon}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        helperText={helperText}
        errorText={errorText}
        hasError={hasError}
        disabled={disabled}
        id={id}
        rows={rows}
        className={className}
      />
    </div>
  );
};

export const Default: Story = {
  render: Template,
  args: {
    label: 'О себе',
    name: 'description',
    placeholder: 'Коротко опишите, чему можете научить',
  },
};

export const WithIcon: Story = {
  render: Template,
  args: {
    label: 'Описание',
    name: 'description',
    placeholder: 'Коротко опишите, чему можете научить',
    icon: <PencilIcon />,
  },
};

export const WithHelperText: Story = {
  render: Template,
  args: {
    label: 'Описание',
    name: 'description',
    value: 'Текст',
    helperText: 'Максимум 500 символов',
  },
};

export const Error: Story = {
  render: Template,
  args: {
    label: 'Описание',
    name: 'description',
    value: 'Текст',
    errorText: 'Поле заполнено неверно',
  },
};
