export type TCatalogCardLayoutProps = {
  avatar: string;
  name: string;
  ageText: string;
  cityName: string;

  teachTag: {
    label: string;
    bgColor: string;
  };

  learnTags: {
    id: number;
    label: string;
    bgColor: string;
  }[];

  likesCount: number;
  isFavorited: boolean;

  onDetailsClick?: () => void;
  onFavoriteToggle?: (nextValue: boolean) => void;
};