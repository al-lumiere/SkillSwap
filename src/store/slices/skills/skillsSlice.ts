/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { Skill, SkillsQueryParams } from '@api/types';
import { skillsApi } from '@api/skillsApi';
import type { RootState } from '@store/store';
import { toggleFavoriteThunk } from '@slices/auth/userSlice';

const FAVORITES_KEY = 'favorites';

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
  detailsLoading: boolean;
  detailsError?: string;
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
  detailsLoading: false,
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

export const fetchSkillById = createAsyncThunk<Skill, number, { state: RootState }>(
  'skills/fetchSkillById',
  async (id) => {
    const skill = await skillsApi.getSkillById(id);
    if (!skill) {
      throw new Error('Skill not found');
    }
    return skill;
  },
);

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

      // защита от двойного применения
      const prevValue = Boolean(skill.isFavorited);
      if (prevValue === nextValue) return;

      skill.isFavorited = nextValue;

      const delta = nextValue ? 1 : -1;
      const nextCount = (skill.favoritesCount ?? 0) + delta;

      // защита от ухода в минус
      skill.favoritesCount = Math.max(0, nextCount);

      // реактивность favorites-ленты
      const favList = state.lists[FAVORITES_KEY] ?? (state.lists[FAVORITES_KEY] = createEmptyList());
      const { ids } = favList;

      if (nextValue) {
        // добавляем, если ещё нет
        if (!ids.includes(skillId)) {
          ids.unshift(skillId);
          favList.total += 1;
        }
      } else {
        // удаляем
        const i = ids.indexOf(skillId);
        if (i !== -1) {
          ids.splice(i, 1);
          favList.total = Math.max(0, favList.total - 1);
        }
      }
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
      })
      .addCase(fetchSkillById.pending, (state) => {
        state.detailsLoading = true;
        state.detailsError = undefined;
      })
      .addCase(fetchSkillById.fulfilled, (state, action) => {
        const skill = action.payload;
        state.entities[skill.id] = skill;
        state.detailsLoading = false;
      })
      .addCase(fetchSkillById.rejected, (state, action) => {
        state.detailsLoading = false;
        state.detailsError = action.error.message;
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

// еденичный скилл по id
export const selectSkillById =
  (id: number) =>
  (state: RootState): Skill | null =>
    state.skills.entities[id] ?? null;

export const { resetList, toggleFavorite } = skillsSlice.actions;

export const toggleFavoriteOptimistic = createAsyncThunk<
  { skillId: number; isFavorited: boolean },
  number,
  { state: RootState }
>('skills/toggleFavoriteOptimistic', async (skillId, { dispatch, getState }) => {
  const skill = getState().skills.entities[skillId];
  if (!skill) {
    // чтобы consistent-return был доволен — бросаем
    throw new Error('Skill not found');
  }

  const nextValue = !skill.isFavorited;

  // оптимистично
  dispatch(toggleFavorite({ skillId, nextValue }));

  try {
    const res = await dispatch(toggleFavoriteThunk(skillId)).unwrap();

    // сервер (localStorage) сказал итоговое состояние — синхронизируем на всякий, т.е.
    // если где-то состояние разошлось (двойной клик, гонка, т.п.) — мы приводим UI
    // к “истинному” результату из localStorage.
    dispatch(toggleFavorite({ skillId, nextValue: res.isFavorited }));
    return { skillId, isFavorited: res.isFavorited };
  } catch (err) {
    // откат если обосрались
    dispatch(toggleFavorite({ skillId, nextValue: !nextValue }));
    throw err;
  }
});

export default skillsSlice.reducer;
