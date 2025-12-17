import { combineReducers } from '@reduxjs/toolkit';
import categoriesReducer from '../../../entities/slices/categoriesSlice';
import headerReducer from '../../../entities/slices/headerSlice';

export const rootReducer = combineReducers({
  categories: categoriesReducer,
  header: headerReducer,
});
