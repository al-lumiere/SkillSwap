export interface ProfileNavElementUIProps {
  text: string;
  icon: React.ReactNode;
  to: string;
  onClick?: () => void;
  isActive?: boolean;
}
