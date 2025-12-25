import { useCallback, useMemo, useState, useEffect } from 'react';
import type { FiltersBlockUIProps } from '@components/filters-block/type';

import { useDispatch, useSelector } from '@store/store';

import { resetFilters, setCities, setGender, setMode, setSubcategories } from '@slices/skills/filtersSlice';

import { fetchCategories } from '@slices/categories/categoriesSlice';
import { fetchCities } from '@slices/cities/citiesSlice';

import type { Category, City } from '@api/types';

const EMPTY_CATEGORIES: Category[] = [];
const EMPTY_CITIES: City[] = [];

const MODE_OPTIONS = [
  { label: 'Всё', value: 'all' },
  { label: 'Хочу научиться', value: 'learn' },
  { label: 'Могу научить', value: 'teach' },
] as const;

const GENDER_OPTIONS = [
  { label: 'Любой', value: 'any' },
  { label: 'Мужской', value: 'male' },
  { label: 'Женский', value: 'female' },
] as const;

export const useCatalogFilters = () => {
  const dispatch = useDispatch();

  // Данные
  const filters = useSelector((s) => s.filters);
  const categoriesState = useSelector((s) => s.categories);
  const citiesState = useSelector((s) => s.cities);

  const [expandedCategoryIds, setExpandedCategoryIds] = useState<number[]>([]);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [showAllCities, setShowAllCities] = useState(false);

  useEffect(() => {
    if (categoriesState.status === 'idle') dispatch(fetchCategories());
  }, [dispatch, categoriesState.status]);

  useEffect(() => {
    if (citiesState.status === 'idle') dispatch(fetchCities());
  }, [dispatch, citiesState.status]);

  const categories = categoriesState.data ?? EMPTY_CATEGORIES;
  const cities = citiesState.data ?? EMPTY_CITIES;

  const visibleCategories = useMemo(
    () => (showAllCategories ? categories : categories.slice(0, 6)),
    [categories, showAllCategories],
  );

  const visibleCities = useMemo(() => (showAllCities ? cities : cities.slice(0, 5)), [cities, showAllCities]);
  const selectedSubSet = useMemo(() => new Set(filters.subcategoryId), [filters.subcategoryId]);

  const visibleCategoriesVM = useMemo(
    () =>
      visibleCategories.map((category) => ({
        ...category,
        hasSelected: (category.subcategories ?? []).some((sub) => selectedSubSet.has(sub.id)),
      })),
    [visibleCategories, selectedSubSet],
  );

  const onToggleExpandCategory = useCallback((categoryId: number) => {
    setExpandedCategoryIds((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    );
  }, []);

  const onToggleSubcategory = useCallback(
    (subcategoryId: number, checked: boolean) => {
      const prev = filters.subcategoryId;

      let next: number[];

      if (checked) {
        next = prev.includes(subcategoryId) ? prev : [...prev, subcategoryId];
      } else {
        next = prev.filter((id) => id !== subcategoryId);
      }

      dispatch(setSubcategories(next));
    },
    [dispatch, filters.subcategoryId],
  );

  const onToggleCity = useCallback(
    (cityId: number, checked: boolean) => {
      const prev = filters.cityIds;

      let next: number[];

      if (checked) {
        next = prev.includes(cityId) ? prev : [...prev, cityId];
      } else {
        next = prev.filter((id) => id !== cityId);
      }

      dispatch(setCities(next));
    },
    [dispatch, filters.cityIds],
  );

  const appliedCount = useMemo(() => {
    let count = 0;

    if (filters.mode !== 'all') count += 1;
    count += filters.subcategoryId.length;

    if (filters.gender !== 'any') count += 1;
    count += filters.cityIds.length;

    return count;
  }, [filters.mode, filters.subcategoryId.length, filters.gender, filters.cityIds.length]);

  const onReset = useCallback(() => {
    dispatch(resetFilters());
    setExpandedCategoryIds([]);
    setShowAllCategories(false);
    setShowAllCities(false);
  }, [dispatch]);

  const filtersProps: FiltersBlockUIProps = useMemo(
    () => ({
      appliedCount,
      onReset,

      intent: {
        name: 'mode',
        title: undefined,
        options: MODE_OPTIONS as unknown as FiltersBlockUIProps['intent']['options'],
        value: filters.mode,
        onChange: (v: string) => dispatch(setMode(v as 'all' | 'teach' | 'learn')),
      },

      skills: {
        title: 'Навыки',
        categories: visibleCategoriesVM as FiltersBlockUIProps['skills']['categories'],
        expandedCategoryIds,
        onToggleExpandCategory,
        selectedSubcategoryIds: filters.subcategoryId,
        onToggleSubcategory,
        showMore: {
          label: 'Все категории',
          open: showAllCategories,
          onClick: () => setShowAllCategories((x) => !x),
        },
      },

      authorGender: {
        name: 'gender',
        title: 'Пол автора',
        options: GENDER_OPTIONS as unknown as FiltersBlockUIProps['authorGender']['options'],
        value: filters.gender,
        onChange: (v: string) => dispatch(setGender(v as 'any' | 'male' | 'female')),
      },

      city: {
        label: 'Город',
        items: visibleCities,
        selectedCityIds: filters.cityIds,
        onToggleCity,
        showMore: {
          label: 'Все города',
          open: showAllCities,
          onClick: () => setShowAllCities((x) => !x),
        },
      },
    }),
    [
      appliedCount,
      onReset,
      dispatch,
      filters.mode,
      filters.gender,
      filters.subcategoryId,
      filters.cityIds,
      visibleCategoriesVM,
      expandedCategoryIds,
      onToggleExpandCategory,
      onToggleSubcategory,
      showAllCategories,
      visibleCities,
      onToggleCity,
      showAllCities,
    ],
  );

  return { filtersProps };
};
