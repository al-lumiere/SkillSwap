import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { CheckboxFilterContainerUI } from './checkbox-filter-container';
import { RadioGroupUI } from '../radio-group';
import { CheckboxItemUI } from '../checkbox-item';
import { CheckboxListUI } from '../checkbox-group';
import { ShowMoreButtonUI } from '../show-more-button';
import type { RadioGroupUIProps } from '../radio-group/type';

const meta: Meta<typeof CheckboxFilterContainerUI> = {
  title: 'ui/CheckboxFilterContainerUI',
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

const RadioGroupWrapper = ({ value: initialValue, onChange, title, options, name }: RadioGroupUIProps) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (newValue: string) => {
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return <RadioGroupUI value={value} onChange={handleChange} title={title} options={options} name={name} />;
};

export const WithRadioGroup: Story = {
  render: () => {
    const [radioValue, setRadioValue] = useState('not-specified');

    return (
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
    );
  },
};

export const WithCheckboxGroups: Story = {
  render: () => {
    const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
      'foreign-languages': true,
    });

    const [checkedCategories, setCheckedCategories] = useState<Record<string, boolean>>({
      business: false,
      creativity: false,
      'foreign-languages': true,
      education: false,
      health: false,
      home: false,
    });

    const [checkedLanguages, setCheckedLanguages] = useState<Record<string, boolean>>({
      english: false,
      spanish: false,
      french: false,
      german: false,
      chinese: false,
      japanese: false,
      exams: false,
    });

    const [showAllCategories, setShowAllCategories] = useState(false);

    const handleToggleGroup = (groupId: string) => {
      setExpandedGroups((prev) => ({
        ...prev,
        [groupId]: !prev[groupId],
      }));
    };

    const handleToggleCategory = (categoryId: string) => {
      setCheckedCategories((prev) => ({
        ...prev,
        [categoryId]: !prev[categoryId],
      }));
    };

    const handleToggleLanguage = (languageId: string) => {
      setCheckedLanguages((prev) => ({
        ...prev,
        [languageId]: !prev[languageId],
      }));
    };

    const allCategories = [
      { id: 'business', label: 'Бизнес и карьера' },
      { id: 'creativity', label: 'Творчество и искусство' },
      {
        id: 'foreign-languages',
        label: 'Иностранные языки',
        children: [
          { id: 'english', label: 'Английский' },
          { id: 'spanish', label: 'Испанский' },
          { id: 'french', label: 'Французский' },
          { id: 'german', label: 'Немецкий' },
          { id: 'chinese', label: 'Китайский' },
          { id: 'japanese', label: 'Японский' },
          { id: 'exams', label: 'Подготовка к экзаменам (IELTS, TOEFL)' },
        ],
      },
      { id: 'education', label: 'Образование и развитие' },
      { id: 'health', label: 'Здоровье и лайфстайл' },
      { id: 'home', label: 'Дом и уют' },
    ];

    const visibleCount = 4;
    const visibleCategories = showAllCategories ? allCategories : allCategories.slice(0, visibleCount);

    return (
      <div
        style={{
          display: 'flex',
          padding: '20px',
          backgroundColor: '#f9faf7',
          borderRadius: '8px',
          width: '400px',
          flexDirection: 'column',
          gap: '12px',
        }}
      >
        <CheckboxFilterContainerUI label="Навыки">
          {visibleCategories.map((category) => {
            if (category.children) {
              return (
                <CheckboxListUI
                  key={category.id}
                  label={category.label}
                  expanded={expandedGroups[category.id] || false}
                  onToggleExpand={() => handleToggleGroup(category.id)}
                >
                  {category.children.map((child) => (
                    <CheckboxItemUI
                      key={child.id}
                      label={child.label}
                      checked={checkedLanguages[child.id] || false}
                      onChange={() => handleToggleLanguage(child.id)}
                    />
                  ))}
                </CheckboxListUI>
              );
            }
            return (
              <CheckboxItemUI
                key={category.id}
                label={category.label}
                checked={checkedCategories[category.id] || false}
                onChange={() => handleToggleCategory(category.id)}
              />
            );
          })}
          {allCategories.length > visibleCount && (
            <ShowMoreButtonUI
              label="Все категории"
              open={showAllCategories}
              onClick={() => setShowAllCategories(!showAllCategories)}
            />
          )}
        </CheckboxFilterContainerUI>
      </div>
    );
  },
};
