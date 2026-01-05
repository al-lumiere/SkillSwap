import { Subcategory } from '@api/types';

export type TModalCategoryUIProps = {
  title: string;
  bgColor: string;
  icon: React.ReactNode;
  subcategories: Subcategory[];
};
