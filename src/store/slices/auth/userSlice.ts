/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type {
  RegisterPayload,
  LoginPayload,
  AuthUser,
  UpdateProfilePayload,
  UpdateSkillPayload,
  ChangePasswordPayload,
} from '@api/types';
import { userApi } from '@api/userApi';

type Status = 'idle' | 'loading' | 'succeeded' | 'failed';

type UserState = {
  currentUser: AuthUser | null;
  status: Status;
  error: string | null;
  isAuthChecked: boolean;
};

const initialState: UserState = {
  currentUser: null,
  status: 'idle',
  error: null,
  isAuthChecked: false,
};

export const fetchCurrentUserThunk = createAsyncThunk('user/fetchCurrentUser', async (_, { rejectWithValue }) => {
  try {
    const user = await userApi.getCurrentUser();
    return user;
  } catch (err) {
    if (err instanceof Error) return rejectWithValue(err.message);
    return rejectWithValue('Не удалось получить текущего пользователя');
  }
});

export const registerUserThunk = createAsyncThunk(
  'user/register',
  async (payload: RegisterPayload, { rejectWithValue }) => {
    try {
      return await userApi.registerUser(payload);
    } catch (err) {
      if (err instanceof Error) return rejectWithValue(err.message);
      return rejectWithValue('Ошибка регистрации');
    }
  },
);

export const loginUserThunk = createAsyncThunk('user/login', async (payload: LoginPayload, { rejectWithValue }) => {
  try {
    return await userApi.loginUser(payload);
  } catch (err) {
    if (err instanceof Error) return rejectWithValue(err.message);
    return rejectWithValue('Ошибка входа');
  }
});

export const logoutUserThunk = createAsyncThunk('user/logout', async () => userApi.logoutUser());

export const updateProfileThunk = createAsyncThunk(
  'user/updateProfile',
  async (patch: UpdateProfilePayload, { rejectWithValue }) => {
    try {
      const user = await userApi.updateProfile(patch);
      return user;
    } catch (err) {
      if (err instanceof Error) return rejectWithValue(err.message);
      return rejectWithValue('Ошибка обновления профиля');
    }
  },
);

export const updateSkillThunk = createAsyncThunk(
  'user/updateSkill',
  async (payload: UpdateSkillPayload, { rejectWithValue }) => {
    try {
      const user = await userApi.updateSkill(payload);
      return user;
    } catch (err) {
      if (err instanceof Error) return rejectWithValue(err.message);
      return rejectWithValue('Ошибка обновления навыка');
    }
  },
);

export const changePasswordThunk = createAsyncThunk(
  'user/changePassword',
  async (payload: ChangePasswordPayload, { rejectWithValue }) => {
    try {
      await userApi.changePassword(payload);
      return true;
    } catch (err) {
      if (err instanceof Error) return rejectWithValue(err.message);
      return rejectWithValue('Ошибка смены пароля');
    }
  },
);

export const toggleFavoriteThunk = createAsyncThunk(
  'user/toggleFavorite',
  async (skillId: number, { rejectWithValue }) => {
    try {
      return await userApi.toggleFavorite(skillId);
    } catch (err) {
      if (err instanceof Error) return rejectWithValue(err.message);
      return rejectWithValue('Не удалось поставить/снять лайк');
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      // fetchCurrentUser
      .addCase(fetchCurrentUserThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCurrentUserThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentUser = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(fetchCurrentUserThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.currentUser = null;
        state.isAuthChecked = true;
        state.error = (action.payload as string) || 'Не удалось получить текущего пользователя';
      })

      // register
      .addCase(registerUserThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentUser = action.payload.user;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) || 'Ошибка регистрации';
      })

      // login
      .addCase(loginUserThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentUser = action.payload.user;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) || 'Ошибка входа';
      })

      // logout
      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.currentUser = null;
      })

      // updateProfile
      .addCase(updateProfileThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateProfileThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentUser = action.payload;
      })
      .addCase(updateProfileThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) || 'Ошибка обновления профиля';
      })

      // updateSkill
      .addCase(updateSkillThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateSkillThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentUser = action.payload;
      })
      .addCase(updateSkillThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) || 'Ошибка обновления навыка';
      })

      // changePassword
      .addCase(changePasswordThunk.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(changePasswordThunk.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(changePasswordThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = (action.payload as string) || 'Ошибка смены пароля';
      })

      // likes
      .addCase(toggleFavoriteThunk.fulfilled, (state, action) => {
        if (!state.currentUser) return;
        state.currentUser.likedSkillIds = action.payload.likedSkillIds;
      });
  },
});

export default userSlice.reducer;
