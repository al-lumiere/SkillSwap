import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../app/providers/store/store';

export const selectCategoryColorById = createSelector([(state: RootState) => state.categories.data], (categories) => {
  const colorById: Record<number, string> = {};

  categories.forEach((category) => {
    colorById[category.id] = category.color;
  });

  return colorById;
});
