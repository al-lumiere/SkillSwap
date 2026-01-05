import { ReactNode } from 'react';

export interface ModalUIProps {
  onClose: () => void;
  children: ReactNode;
}