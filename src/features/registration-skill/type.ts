import type { Step3Skill } from '@slices/registration/registrationSlice';
import { ChangeEvent } from 'react';
import { Category } from '@api/types';

export type RegistrationSkillUIProps = {
  localDraft: Step3Skill;
  onField: (
    field: keyof Step3Skill,
  ) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onSkillImages: (e: ChangeEvent<HTMLInputElement>) => void;
  categories: Category[];
  categoriesStatus: 'idle' | 'loading' | 'succeeded' | 'failed';

  skillCategoryId: string; // можно передавать как строку для простоты disabled и value
  skillSubcategories: { id: number; name: string }[];

  onSkillCategoryChange: (categoryId: string) => void;
};
