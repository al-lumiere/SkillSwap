import { FC } from 'react';

import { RadioGroupUI } from '@ui/radio-group';
import { CheckboxFilterContainerUI } from '@ui/checkbox-filter-container';
import { CheckboxListUI } from '@ui/checkbox-list';
import { CheckboxItemUI } from '@ui/checkbox-item';
import { ButtonUI } from '@ui/button';
import { ShowMoreButtonUI } from '@ui/show-more-button';

import CrossIcon from '@icons/cross-icon';

import { FiltersBlockUIProps } from './type';

import styles from './filters-block.module.css';

export const FiltersBlockUI: FC<FiltersBlockUIProps> = ({
  appliedCount = 0,
  onReset,
  intent,
  skills,
  authorGender,
  city,
}) => {
  const headerTitle = appliedCount > 0 ? `Фильтры (${appliedCount})` : 'Фильтры';

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className={styles.title}>{headerTitle}</h2>
        {appliedCount > 0 && onReset && (
          <ButtonUI onClick={onReset} variant="tertiary">
            <span>Сбросить</span>
            <CrossIcon className={styles.resetIcon} />
          </ButtonUI>
        )}
      </div>

      <div className={styles.filters}>
        <RadioGroupUI
          title={intent.title}
          options={intent.options}
          value={intent.value}
          onChange={intent.onChange}
          name={intent.name}
        />

        <CheckboxFilterContainerUI label={skills.title}>
          {skills.categories.map((category) => {
            const expanded = skills.expandedCategoryIds.includes(category.id);

            return (
              <CheckboxListUI
                key={category.id}
                label={category.name}
                expanded={expanded}
                onToggleExpand={() => skills.onToggleExpandCategory(category.id)}
              >
                {category.subcategories.map((subcategory) => (
                  <CheckboxItemUI
                    key={subcategory.id}
                    label={subcategory.name}
                    checked={skills.selectedSubcategoryIds.includes(subcategory.id)}
                    onChange={(e) => skills.onToggleSubcategory(subcategory.id, e.target.checked)}
                  />
                ))}
              </CheckboxListUI>
            );
          })}

          <ShowMoreButtonUI
            label={skills.showMore.label}
            open={skills.showMore.open}
            onClick={skills.showMore.onClick}
          />
        </CheckboxFilterContainerUI>

        <RadioGroupUI
          title={authorGender.title}
          options={authorGender.options}
          value={authorGender.value}
          onChange={authorGender.onChange}
          name={authorGender.name}
        />

        <CheckboxFilterContainerUI label={city.label}>
          {city.items.map((cityItem) => (
            <CheckboxItemUI
              key={cityItem.id}
              label={cityItem.name}
              checked={city.selectedCityIds.includes(cityItem.id)}
              onChange={(e) => city.onToggleCity(cityItem.id, e.target.checked)}
            />
          ))}

          <ShowMoreButtonUI label={city.showMore.label} open={city.showMore.open} onClick={city.showMore.onClick} />
        </CheckboxFilterContainerUI>
      </div>
    </div>
  );
};
