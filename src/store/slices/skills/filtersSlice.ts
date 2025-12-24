/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type FiltersState = {
  mode: 'all' | 'teach' | 'learn';
  subcategoryId: number[];
  gender: 'any' | 'male' | 'female';
  cityIds: number[];
};

const initialState: FiltersState = {
  mode: 'all',
  subcategoryId: [],
  gender: 'any',
  cityIds: [],
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
    setCities(state, action: PayloadAction<number[]>) {
      state.cityIds = action.payload;
    },
    resetFilters() {
      return initialState;
    },
  },
});

export const { setMode, setSubcategories, setGender, setCities, resetFilters } = filtersSlice.actions;

export default filtersSlice.reducer;
