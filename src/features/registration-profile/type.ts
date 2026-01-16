import type { Step2Profile } from '@slices/registration/registrationSlice';
import { ChangeEvent } from 'react';
import { City, Category } from '@api/types';
import { Step2Errors } from '@pages/register/register';

export type RegistrationProfileUIProps = {
  localDraft: Step2Profile;
  onAvatarFile: (e: ChangeEvent<HTMLInputElement>) => void;
  onField: (
    field: keyof Step2Profile,
  ) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  cities: City[];
  citiesStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  categories: Category[];
  categoriesStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  learnCategoryId: string;
  learnSubcategories: { id: number; name: string }[];
  onLearnCategoryChange: (categoryId: string) => void;
  errors: Step2Errors;
};
