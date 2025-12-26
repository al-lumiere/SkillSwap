export interface SkillDetailsCardProps {
  title: string;
  category: string;
  description: string;
  images: string[];
  onOfferExchange?: () => void;
  className?: string;
  isFavorite: boolean;
  onFavoriteToggle?: (nextValue: boolean) => void;
}
