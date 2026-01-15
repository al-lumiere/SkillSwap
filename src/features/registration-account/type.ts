import { ChangeEvent } from 'react';
import type { Step1Account } from '@slices/registration/registrationSlice';

export type RegistrationAccountUIProps = {
  isLoading: boolean;
  localDraft: Step1Account;
  onField: (field: string) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
};
