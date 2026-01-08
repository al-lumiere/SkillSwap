import { FC, useMemo } from 'react';
import { useSelector } from '@store/store';
import { Filters } from '@features/filters';
import { PopularSkills } from '@features/popular-skills';
import { NewSkills } from '@features/new-skills';
import { RecommendedSkills } from '@features/recommended-skills';
import { FilteredSkills } from '@features/filtered-skills';

import style from './home.module.css';

export const HomePage: FC = () => {
  const filters = useSelector((s) => s.filters);
  const debounced = useSelector((s) => s.search.debouncedQuery);

  const isFilterActive = useMemo(() => {
    const hasSearch = Boolean(debounced?.trim());
    const hasGender = filters.gender !== 'any';
    const hasSubcats = filters.subcategoryId.length > 0;
    const hasCities = filters.cityIds.length > 0;
    const hasMode = filters.mode !== 'all';
    return hasSearch || hasGender || hasSubcats || hasCities || hasMode;
  }, [debounced, filters]);

  return (
    <div className={style.wrapper}>
        <Filters />
        <div className={style.sections}>
          {isFilterActive ? (
            <FilteredSkills />
          ) : (
            <>
              <PopularSkills />
              <NewSkills />
              <RecommendedSkills />
            </>
          )}
        </div>
    </div>
  );
};
