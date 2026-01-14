import type { ChangeEvent, ReactNode } from 'react';

export type TTextAreaUIProps = {
  label?: string;
  name: string;
  icon?: ReactNode;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  helperText?: string;
  errorText?: string;
  hasError?: boolean;
  className?: string;
  disabled?: boolean;
  id?: string;
  rows?: number;
};
