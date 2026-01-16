import { ChangeEvent } from 'react';
import type { Step1Account } from '@slices/registration/registrationSlice';
import { Step1Errors } from '@pages/register/register';

export type RegistrationAccountUIProps = {
  isLoading: boolean;
  localDraft: Step1Account;
  errors: Step1Errors;
  onField: (field: string) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
};
