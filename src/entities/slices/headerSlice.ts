import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * UI-состояние хедера.
 * Используется вместо локального state в MainLayout.
 */
export type THeaderState = {
  searchValue: string;
  isAboutActive: boolean;
  isAllSkillsOpen: boolean;
};

const initialState: THeaderState = {
  searchValue: '',
  isAboutActive: false,
  isAllSkillsOpen: false,
};

const headerSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => ({
      ...state,
      searchValue: action.payload,
    }),

    clearSearch: (state) => ({
      ...state,
      searchValue: '',
    }),

    aboutClicked: (state) => ({
      ...state,
      isAboutActive: true,
      isAllSkillsOpen: false,
    }),

    allSkillsToggled: (state) => ({
      ...state,
      isAboutActive: false,
      isAllSkillsOpen: !state.isAllSkillsOpen,
    }),

    closeAllSkills: (state) => ({
      ...state,
      isAllSkillsOpen: false,
    }),
  },
});

export const headerActions = headerSlice.actions;

export default headerSlice.reducer;
