type Placement = 'bottom-start' | 'bottom-end';

export type PopoverUIProps = {
  isOpen: boolean;
  onClose: () => void;
  anchor: React.ReactNode;
  children?: React.ReactNode;
  placement: Placement;
  maxWidth?: number | null;
  offset: number;
  matchWidth?: boolean;
  popoverClassName?: string;
  hasError?: boolean;
};
