import { combineReducers } from '@reduxjs/toolkit';
import categoriesReducer from '@slices/categories/categoriesSlice';
import skillsReducer from '@slices/skills/skillsSlice';
import filtersReducer from '@slices/skills/filtersSlice';
import searchReducer from '@slices/skills/searchSlice';
import citiesReducer from '@slices/cities/citiesSlice';
import userReducer from '@slices/auth/userSlice';
import registrationReducer from '@slices/registration/registrationSlice';

export const rootReducer = combineReducers({
  skills: skillsReducer,
  filters: filtersReducer,
  search: searchReducer,
  categories: categoriesReducer,
  cities: citiesReducer,
  user: userReducer,
  registration: registrationReducer,
});
