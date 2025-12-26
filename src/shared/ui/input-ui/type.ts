import type { ChangeEvent, HTMLInputTypeAttribute, ReactNode } from 'react';

export type TInputUIProps = {
  label?: string;
  name: string;
  type?: HTMLInputTypeAttribute;
  icon?: ReactNode;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: string;
  placeholder?: string;
  required?: boolean;
  helperText?: string;
  errorText?: string;
  className?: string;
  disabled?: boolean;
  id?: string;
  showPasswordToggle?: boolean;
};
