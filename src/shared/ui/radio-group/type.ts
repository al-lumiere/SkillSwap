export interface RadioOption {
  value: string;
  label: string;
}

export interface RadioGroupUIProps {
  title?: string;
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  name: string;
}
