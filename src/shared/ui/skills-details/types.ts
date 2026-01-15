export interface SkillDetailsCardUIProps {
  title: string;
  category: string;
  description: string;
  isCardActions: boolean;
  images: string[];
  onOfferExchange?: () => void;
  className?: string;
  isFavorite?: boolean;
  onFavoriteToggle?: (nextValue: boolean) => void;
  isOfferSent?: boolean;
  isSkillPage: boolean;
  onChangeClick?: () => void;
  onSubmitClick?: () => void;
}
