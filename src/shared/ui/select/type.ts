export type SelectVariant = 'dropdown' | 'search';

export type SelectUIProps = {
  variant?: SelectVariant;
  label: string;
  placeholder: string;
  value?: string;
  isOpen: boolean;
  handleToggle: () => void;
  query?: string;
  handleQueryChange?: (value: string) => void;
  handleClear?: () => void;
};
