import { createSelector } from '@reduxjs/toolkit';
import { Category } from '@api/types';
import { RootState } from '@store/store';

export const selectCategoryColorById = createSelector([(state: RootState) => state.categories.data], (categories) => {
  const colorById: Record<number, string> = {};

  categories.forEach((category: Category) => {
    colorById[category.id] = category.color;
  });

  return colorById;
});
