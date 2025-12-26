export interface SkillDetailsCardProps {
  title: string;
  category: string;
  description: string;
  images: string[];
  onOfferExchange?: () => void;
  className?: string;
}
