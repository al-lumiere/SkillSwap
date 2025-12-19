export type TUserPanelUIProps = {
  // в actions будут передаваться IconButton
  actions: React.ReactNode;
  userName: string;
  avatarUrl?: string;
  onUserClick?: () => void;
};
