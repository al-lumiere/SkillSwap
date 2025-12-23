// Все это нужно будет перенести в умный элемент фильтров + убрать файл с моковыми данными

import { useCallback, useMemo, useState } from 'react';
import type { FiltersBlockUIProps } from '@components/filters-block/type';

import {
  CATEGORIES,
  CITIES,
  DEFAULT_GENDER,
  DEFAULT_INTENT,
  GENDER_OPTIONS,
  INTENT_OPTIONS,
} from './main-layout.mocks';

export const useCatalogFilters = () => {
  // radio
  const [intentValue, setIntentValue] = useState<string>(DEFAULT_INTENT);
  const [genderValue, setGenderValue] = useState<string>(DEFAULT_GENDER);

  // skills
  const [expandedCategoryIds, setExpandedCategoryIds] = useState<number[]>([]);
  const [selectedSubcategoryIds, setSelectedSubcategoryIds] = useState<number[]>([]);
  const [showAllCategories, setShowAllCategories] = useState(false);

  // cities
  const [selectedCityIds, setSelectedCityIds] = useState<number[]>([]);
  const [showAllCities, setShowAllCities] = useState(false);

  const visibleCategories = useMemo(
    () => (showAllCategories ? CATEGORIES : CATEGORIES.slice(0, 6)),
    [showAllCategories],
  );

  const visibleCities = useMemo(() => (showAllCities ? CITIES : CITIES.slice(0, 5)), [showAllCities]);

  const selectedSubSet = useMemo(() => new Set(selectedSubcategoryIds), [selectedSubcategoryIds]);

  const visibleCategoriesVM = useMemo(
    () =>
      visibleCategories.map((category) => ({
        ...category,
        hasSelected: category.subcategories.some((sub) => selectedSubSet.has(sub.id)),
      })),
    [visibleCategories, selectedSubSet],
  );

  const onToggleExpandCategory = useCallback((categoryId: number) => {
    setExpandedCategoryIds((prev) =>
      prev.includes(categoryId) ? prev.filter((id) => id !== categoryId) : [...prev, categoryId],
    );
  }, []);

  const onToggleSubcategory = useCallback((subcategoryId: number, checked: boolean) => {
    setSelectedSubcategoryIds((prev) => {
      if (checked) return prev.includes(subcategoryId) ? prev : [...prev, subcategoryId];
      return prev.filter((id) => id !== subcategoryId);
    });
  }, []);

  const onToggleCity = useCallback((cityId: number, checked: boolean) => {
    setSelectedCityIds((prev) => {
      if (checked) return prev.includes(cityId) ? prev : [...prev, cityId];
      return prev.filter((id) => id !== cityId);
    });
  }, []);

  const appliedCount = useMemo(() => {
    let count = 0;

    if (intentValue !== DEFAULT_INTENT) count += 1;
    count += selectedSubcategoryIds.length;

    if (genderValue !== DEFAULT_GENDER) count += 1;
    count += selectedCityIds.length;

    return count;
  }, [intentValue, genderValue, selectedSubcategoryIds.length, selectedCityIds.length]);

  const onReset = useCallback(() => {
    setIntentValue(DEFAULT_INTENT);
    setGenderValue(DEFAULT_GENDER);

    setExpandedCategoryIds([]);
    setSelectedSubcategoryIds([]);
    setShowAllCategories(false);

    setSelectedCityIds([]);
    setShowAllCities(false);
  }, []);

  const filtersProps: FiltersBlockUIProps = useMemo(
    () => ({
      appliedCount,
      onReset,

      intent: {
        name: 'intent',
        title: undefined,
        options: INTENT_OPTIONS,
        value: intentValue,
        onChange: setIntentValue,
      },

      skills: {
        title: 'Навыки',
        categories: visibleCategoriesVM,
        expandedCategoryIds,
        onToggleExpandCategory,
        selectedSubcategoryIds,
        onToggleSubcategory,
        showMore: {
          label: 'Все категории',
          open: showAllCategories,
          onClick: () => setShowAllCategories((v) => !v),
        },
      },

      authorGender: {
        name: 'authorGender',
        title: 'Пол автора',
        options: GENDER_OPTIONS,
        value: genderValue,
        onChange: setGenderValue,
      },

      city: {
        label: 'Город',
        items: visibleCities,
        selectedCityIds,
        onToggleCity,
        showMore: {
          label: 'Все города',
          open: showAllCities,
          onClick: () => setShowAllCities((v) => !v),
        },
      },
    }),
    [
      appliedCount,
      onReset,

      intentValue,
      visibleCategoriesVM,
      expandedCategoryIds,
      onToggleExpandCategory,
      selectedSubcategoryIds,
      onToggleSubcategory,
      showAllCategories,

      genderValue,
      visibleCities,
      selectedCityIds,
      onToggleCity,
      showAllCities,
    ],
  );

  return {
    filtersProps,
    appliedCount,
    onReset,
  };
};
