/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SearchState = {
  query: string;
  debouncedQuery: string;
};

const initialState: SearchState = {
  query: '',
  debouncedQuery: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    setDebouncedQuery(state, action: PayloadAction<string>) {
      state.debouncedQuery = action.payload;
    },
    clearSearch() {
      return initialState;
    },
  },
});

export const { setQuery, setDebouncedQuery, clearSearch } = searchSlice.actions;
export default searchSlice.reducer;
