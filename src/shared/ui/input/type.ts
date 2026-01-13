import type { ChangeEvent, HTMLInputTypeAttribute, ReactNode } from 'react';

export type TInputUIProps = {
  label?: string;
  name: string;
  type?: HTMLInputTypeAttribute;
  icon?: ReactNode;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  helperText?: string;
  errorText?: string;
  hasError?: boolean;
  className?: string;
  disabled?: boolean;
  id?: string;
  showPasswordToggle?: boolean;
};
