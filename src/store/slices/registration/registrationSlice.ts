/* eslint-disable no-param-reassign */
import { Gender } from '@api/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { registerUserThunk } from '@slices/auth/userSlice';

export type Step = 1 | 2 | 3;

export type Step1Account = { email: string; password: string };
export type Step2Profile = {
  name: string;
  birthDate: string;
  gender: Gender;
  cityId: string;
  learnCategoryId: string;
  learnSubcategoryId: string;
  avatar?: string;
  bio?: string;
};
export type Step3Skill = {
  skillTitle: string;
  skillCategoryId: string;
  skillSubcategoryId: string;
  skillDescription: string;
  skillImages?: string[];
};

export type RegistrationFormData = {
  step1: Step1Account;
  step2: Step2Profile;
  step3: Step3Skill;
};

export type RegistrationState = {
  step: Step;
  formData: RegistrationFormData; // подтвержденные кнопкой "далее" данные
  draft: Partial<RegistrationFormData>; // черновик, только для шагов, где есть несохранённые вводы/правки
};

const emptyStep1: Step1Account = { email: '', password: '' };
const emptyStep2: Step2Profile = {
  name: '',
  birthDate: '',
  gender: 'any',
  cityId: '',
  learnCategoryId: '',
  learnSubcategoryId: '',
  avatar: '',
  bio: '',
};
const emptyStep3: Step3Skill = {
  skillTitle: '',
  skillCategoryId: '',
  skillSubcategoryId: '',
  skillDescription: '',
  skillImages: [],
};

const initialState: RegistrationState = {
  step: 1,
  formData: {
    step1: { ...emptyStep1 },
    step2: { ...emptyStep2 },
    step3: { ...emptyStep3 },
  },
  draft: {},
};

function stepKey(step: Step): keyof RegistrationFormData {
  if (step === 1) return 'step1';
  if (step === 2) return 'step2';
  return 'step3';
}

type SaveDraftPayload =
  | { step: 1; data: Step1Account }
  | { step: 2; data: Step2Profile }
  | { step: 3; data: Step3Skill };

type CommitStepPayload = SaveDraftPayload;

export const registrationSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    setStep(state, action: PayloadAction<Step>) {
      state.step = action.payload;
    },

    // записываем черновик шага при уходе/размонтаже
    saveDraft(state, action: PayloadAction<SaveDraftPayload>) {
      const { step, data } = action.payload;
      const key = stepKey(step);
      state.draft[key] = data as never;
    },

    // фиксируем данные шага при клике по "далее" (тут же отчищаем черновик шага)
    commitStep(state, action: PayloadAction<CommitStepPayload>) {
      const { step, data } = action.payload;
      const key = stepKey(step);
      state.formData[key] = data as never;
      delete state.draft[key];
    },

    // в последней версии не используется, но оставлю на всякий
    clearDraftForStep(state, action: PayloadAction<Step>) {
      const key = stepKey(action.payload);
      delete state.draft[key];
    },

    resetRegistration() {
      return initialState;
    },
  },
  extraReducers(builder) {
    builder.addCase(registerUserThunk.fulfilled, () => initialState);
  },
});

export const { setStep, saveDraft, commitStep, clearDraftForStep, resetRegistration } = registrationSlice.actions;

export default registrationSlice.reducer;
