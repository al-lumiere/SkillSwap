import { combineReducers } from '@reduxjs/toolkit';
import categoriesReducer from '../../../entities/slices/categoriesSlice';

export const rootReducer = combineReducers({
  categories: categoriesReducer,
});
