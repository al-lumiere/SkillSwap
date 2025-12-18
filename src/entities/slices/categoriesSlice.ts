/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fixturesClient } from '../../utils/api';
import { Category } from '../../utils/types';

type CategoriesState = {
  data: Category[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

const initialState: CategoriesState = {
  data: [],
  status: 'idle',
  error: null,
};

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () =>
  fixturesClient.getCategories(),
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Ошибка загрузки категорий';
      });
  },
});

export default categoriesSlice.reducer;
