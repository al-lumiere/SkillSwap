export type CardActionsUIProps = {
  isFavorite?: boolean;
  onFavoriteToggle?: (nextValue: boolean) => void;
  onShareClick: () => void;
  onMoreClick: () => void;
  className?: string;
};
