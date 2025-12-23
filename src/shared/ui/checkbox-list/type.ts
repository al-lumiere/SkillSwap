export type TCheckboxListProps = {
  children: React.ReactNode;
  label: string;
  expanded: boolean;
  onToggleExpand: () => void;
  hasSelected?: boolean;
};
