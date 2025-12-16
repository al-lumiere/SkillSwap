import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { CheckboxFilterContainerUI } from './checkbox-filter-container';
import { RadioGroup } from '../radio-group';
import { CheckboxItemUI } from '../checkbox-item';
import type { RadioGroupProps } from '../radio-group/type';

// OPTIONAL: добавить checkbox-group и add-more-button после их реализации

const meta: Meta<typeof CheckboxFilterContainerUI> = {
  title: 'shared/ui/CheckboxFilterContainer',
  component: CheckboxFilterContainerUI,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Компонент контейнера для чекбоксов',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text', description: 'Текст заголовка' },
    children: { control: false, description: 'Дочерние элементы (радио-группы, чекбоксы и т.д.)' },
  },
};

export default meta;

type Story = StoryObj<typeof CheckboxFilterContainerUI>;

const RadioGroupWrapper = ({ value: initialValue, onChange, title, options, name }: RadioGroupProps) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (newValue: string) => {
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return <RadioGroup value={value} onChange={handleChange} title={title} options={options} name={name} />;
};

export const WithRadioGroup: Story = {
  render: () => (
    <CheckboxFilterContainerUI label="Пол автора">
      <RadioGroupWrapper
        onChange={() => {}}
        options={[
          { value: 'not-specified', label: 'Не имеет значения' },
          { value: 'male', label: 'Мужской' },
          { value: 'female', label: 'Женский' },
        ]}
        value="not-specified"
        name="gender-filter"
      />
    </CheckboxFilterContainerUI>
  ),
};

export const WithCheckboxItems: Story = {
  render: () => {
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
      'skill-1': false,
      'skill-2': true,
      'skill-3': false,
    });

    const handleToggle = (id: string) => {
      setCheckedItems((prev) => ({
        ...prev,
        [id]: !prev[id],
      }));
    };

    return (
      <CheckboxFilterContainerUI label="Категории">
        <CheckboxItemUI
          label="Программирование"
          checked={checkedItems['skill-1']}
          onChange={() => handleToggle('skill-1')}
        />
        <CheckboxItemUI label="Дизайн" checked={checkedItems['skill-2']} onChange={() => handleToggle('skill-2')} />
        <CheckboxItemUI label="Маркетинг" checked={checkedItems['skill-3']} onChange={() => handleToggle('skill-3')} />
      </CheckboxFilterContainerUI>
    );
  },
};

export const WithCheckboxItemsAndShowMore: Story = {
  render: () => {
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
      'skill-1': false,
      'skill-2': true,
      'skill-3': false,
      'skill-4': false,
      'skill-5': true,
      'skill-6': false,
      'skill-7': false,
      'skill-8': false,
    });

    const [showAll, setShowAll] = useState(false);
    const visibleCount = 3;

    const handleToggle = (id: string) => {
      setCheckedItems((prev) => ({
        ...prev,
        [id]: !prev[id],
      }));
    };

    const allItems = [
      { id: 'skill-1', label: 'Программирование' },
      { id: 'skill-2', label: 'Дизайн' },
      { id: 'skill-3', label: 'Маркетинг' },
      { id: 'skill-4', label: 'Языки' },
      { id: 'skill-5', label: 'Музыка' },
      { id: 'skill-6', label: 'Фотография' },
      { id: 'skill-7', label: 'Кулинария' },
      { id: 'skill-8', label: 'Спорт' },
    ];

    const visibleItems = showAll ? allItems : allItems.slice(0, visibleCount);

    return (
      <CheckboxFilterContainerUI label="Категории">
        {visibleItems.map((item) => (
          <CheckboxItemUI
            key={item.id}
            label={item.label}
            checked={checkedItems[item.id]}
            onChange={() => handleToggle(item.id)}
          />
        ))}
        {allItems.length > visibleCount && (
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            style={{
              padding: '8px 16px',
              border: '1px solid var(--accent-color)',
              borderRadius: '8px',
              background: 'transparent',
              color: 'var(--accent-color)',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
              alignSelf: 'flex-start',
            }}
          >
            {showAll ? 'Показать меньше' : 'Показать больше'}
          </button>
        )}
      </CheckboxFilterContainerUI>
    );
  },
};

export const MultipleVariants: Story = {
  render: () => {
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
      'skill-1': false,
      'skill-2': true,
      'skill-3': false,
    });

    const [radioValue, setRadioValue] = useState('not-specified');
    const [showAll, setShowAll] = useState(false);

    const handleToggle = (id: string) => {
      setCheckedItems((prev) => ({
        ...prev,
        [id]: !prev[id],
      }));
    };

    const allSkills = [
      { id: 'skill-1', label: 'JavaScript' },
      { id: 'skill-2', label: 'TypeScript' },
      { id: 'skill-3', label: 'Python' },
      { id: 'skill-4', label: 'Java' },
      { id: 'skill-5', label: 'C#' },
    ];

    const visibleSkills = showAll ? allSkills : allSkills.slice(0, 3);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '400px' }}>
        <CheckboxFilterContainerUI label="Пол автора">
          <RadioGroupWrapper
            options={[
              { value: 'not-specified', label: 'Не имеет значения' },
              { value: 'male', label: 'Мужской' },
              { value: 'female', label: 'Женский' },
            ]}
            value={radioValue}
            onChange={setRadioValue}
            name="gender-filter"
          />
        </CheckboxFilterContainerUI>

        <CheckboxFilterContainerUI label="Языки программирования">
          {visibleSkills.map((skill) => (
            <CheckboxItemUI
              key={skill.id}
              label={skill.label}
              checked={checkedItems[skill.id] || false}
              onChange={() => handleToggle(skill.id)}
            />
          ))}
          {allSkills.length > 3 && (
            <button
              type="button"
              onClick={() => setShowAll(!showAll)}
              style={{
                padding: '8px 16px',
                border: '1px solid var(--accent-color)',
                borderRadius: '8px',
                background: 'transparent',
                color: 'var(--accent-color)',
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'pointer',
                alignSelf: 'flex-start',
              }}
            >
              {showAll ? 'Показать меньше' : 'Показать больше'}
            </button>
          )}
        </CheckboxFilterContainerUI>
      </div>
    );
  },
};
