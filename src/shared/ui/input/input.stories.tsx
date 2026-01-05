import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, type ChangeEvent } from 'react';
import PencilIcon from '@icons/pencil-icon';
import { InputUI } from './input';
import type { TInputUIProps } from './type';

const meta: Meta<typeof InputUI> = {
  title: 'ui/InputUI',
  component: InputUI,
};

export default meta;

type Story = StoryObj<typeof InputUI>;

const InteractiveTemplate = (args: TInputUIProps) => {
  const {
    label,
    name,
    type = 'text',
    icon,
    value: initialValue = '',
    onChange,
    placeholder,
    required,
    helperText,
    errorText,
    className,
    disabled,
    id,
    showPasswordToggle,
  } = args;

  const [value, setValue] = useState(initialValue);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChange?.(e);
  };

  return (
    <div style={{ width: 720, padding: 24, background: 'white' }}>
      <InputUI
        label={label}
        name={name}
        type={type}
        icon={icon}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        required={required}
        helperText={helperText}
        errorText={errorText}
        className={className}
        disabled={disabled}
        id={id}
        showPasswordToggle={showPasswordToggle}
      />
    </div>
  );
};

export const Email: Story = {
  render: InteractiveTemplate,
  args: {
    label: 'Email',
    name: 'email',
    type: 'email',
    placeholder: 'Введите email',
    value: '',
  },
};

export const Password: Story = {
  render: InteractiveTemplate,
  args: {
    label: 'Пароль',
    name: 'password',
    type: 'password',
    placeholder: 'Введите ваш пароль',
    value: '',
  },
};

export const WithHelperText: Story = {
  render: InteractiveTemplate,
  args: {
    label: 'Имя',
    name: 'name',
    type: 'password',
    placeholder: 'Введите ваш пароль',
    value: '',
    helperText: 'Пароль должен содержать не менее 8 знаков',
  },
};

export const WithPencilIcon: Story = {
  render: InteractiveTemplate,
  args: {
    label: 'Имя',
    name: 'name',
    type: 'text',
    placeholder: 'Введите ваше имя',
    value: '',
    icon: <PencilIcon />,
  },
};

export const Error: Story = {
  render: InteractiveTemplate,
  args: {
    label: 'Email',
    name: 'email',
    type: 'email',
    value: 'petrov@mail.ru',
    errorText: 'Email уже используется',
  },
};
