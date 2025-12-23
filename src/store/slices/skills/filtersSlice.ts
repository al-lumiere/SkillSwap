/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type FiltersState = {
  mode: 'all' | 'teach' | 'learn';
  subcategoryId: number[];
  gender: 'любой' | 'мужской' | 'женский';
  cityId?: number;
};

const initialState: FiltersState = {
  mode: 'all',
  subcategoryId: [],
  gender: 'любой',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setMode(state, action: PayloadAction<FiltersState['mode']>) {
      state.mode = action.payload;
    },
    setSubcategories(state, action: PayloadAction<number[]>) {
      state.subcategoryId = action.payload;
    },
    setGender(state, action: PayloadAction<FiltersState['gender']>) {
      state.gender = action.payload;
    },
    setCity(state, action: PayloadAction<number | undefined>) {
      state.cityId = action.payload;
    },
    resetFilters() {
      return initialState;
    },
  },
});

export const { setMode, setSubcategories, setGender, setCity, resetFilters } = filtersSlice.actions;

export default filtersSlice.reducer;
