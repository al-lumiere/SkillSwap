export type CardActionsUIProps = {
  isFavorite?: boolean;
  onFavoriteToggle?: (isFavorite: boolean) => void;
  onShareClick: () => void;
  onMoreClick: () => void;
  className?: string;
};
