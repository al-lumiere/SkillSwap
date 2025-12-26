/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { Skill, SkillsQueryParams } from '@api/types';
import { skillsApi } from '@api/skillsApi';
import type { RootState } from '@store/store';

type SkillsListState = {
  ids: number[];
  page: number;
  pageSize: number;
  total: number;
  hasMore: boolean;
  loading: boolean;
  error?: string;
};

type SkillsState = {
  entities: Record<number, Skill>;
  lists: Record<string, SkillsListState>;
};

const createEmptyList = (pageSize = 18): SkillsListState => ({
  ids: [],
  page: 1,
  pageSize,
  total: 0,
  hasMore: true,
  loading: false,
});

const EMPTY_SKILLS: Skill[] = [];
const EMPTY_LIST: SkillsListState = createEmptyList();

const initialState: SkillsState = {
  entities: {}, // склад карточек по id ( 41: { id: 41, title: "...", ... } )
  lists: {}, // "ленты" по listKey ("home:popular", "home:new", "home:recommended" )
};

export const fetchSkills = createAsyncThunk<
  { listKey: string; items: Skill[]; total: number },
  { listKey: string; params: SkillsQueryParams; append?: boolean }
>('skills/fetchSkills', async ({ params, listKey }) => {
  const response = await skillsApi.getSkills(params);
  return {
    listKey,
    items: response.results,
    total: response.count,
  };
});

const skillsSlice = createSlice({
  name: 'skills',
  initialState,
  reducers: {
    resetList(state, action: PayloadAction<string>) {
      state.lists[action.payload] = createEmptyList();
    },
    toggleFavorite(state, action: PayloadAction<{ skillId: number; nextValue: boolean }>) {
      const { skillId, nextValue } = action.payload;
      const skill = state.entities[skillId];
      if (!skill) return;

      skill.isFavorited = nextValue;

      const delta = nextValue ? 1 : -1;
      const nextCount = (skill.favoritesCount ?? 0) + delta;

      // защита от ухода в минус
      skill.favoritesCount = Math.max(0, nextCount);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkills.pending, (state, action) => {
        const { listKey, params } = action.meta.arg;
        const list = state.lists[listKey] ?? (state.lists[listKey] = createEmptyList(params.page_size));

        list.loading = true;
        list.error = undefined;
      })
      .addCase(fetchSkills.fulfilled, (state, action) => {
        const { listKey, items, total } = action.payload;
        const { append } = action.meta.arg;

        const list = state.lists[listKey];

        // сохраняем entities
        items.forEach((skill) => {
          state.entities[skill.id] = skill;
        });

        // ids
        if (append) {
          list.ids.push(...items.map((s) => s.id));
        } else {
          list.ids = items.map((s) => s.id);
        }

        // meta
        list.total = total;
        const requestedPage = action.meta.arg.params.page ?? 1;
        list.page = requestedPage + 1;
        list.hasMore = list.ids.length < total;
        list.loading = false;
      })
      .addCase(fetchSkills.rejected, (state, action) => {
        const { listKey } = action.meta.arg;
        const list = state.lists[listKey];
        if (list) {
          list.loading = false;
          list.error = action.error.message;
        }
      });
  },
});

// метаданные конкретного списка
export const selectSkillsList = (listKey: string) => (state: RootState) => state.skills.lists[listKey] ?? EMPTY_LIST;

// массив skills для конкретного списка
export const selectSkillsByList = (listKey: string) => (state: RootState) => {
  const list = state.skills.lists[listKey];
  if (!list) return EMPTY_SKILLS;
  return list.ids.map((id) => state.skills.entities[id]).filter(Boolean);
};

export const { resetList, toggleFavorite } = skillsSlice.actions;
export default skillsSlice.reducer;
