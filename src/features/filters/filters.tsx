import { FC } from 'react';
import { FiltersBlockUI } from '@components/filters-block';
import { useCatalogFilters } from './use-filters-block';
import { MOCK_CARD_DATA } from './filters.mocks';

export const Filters: FC = () => {
  const { filtersProps } = useCatalogFilters();
  const { appliedCount, onReset, intent, skills, authorGender, city } = filtersProps;

  return (
    <FiltersBlockUI
      appliedCount={appliedCount}
      onReset={onReset}
      intent={intent}
      skills={skills}
      authorGender={authorGender}
      city={city}
    />
  );
};
