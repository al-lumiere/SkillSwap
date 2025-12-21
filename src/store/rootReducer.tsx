import { combineReducers } from '@reduxjs/toolkit';
import categoriesReducer from './slices/categories/categoriesSlice';

export const rootReducer = combineReducers({
  categories: categoriesReducer,
});
