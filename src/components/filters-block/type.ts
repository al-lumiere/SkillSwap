import { Category } from "@api/types";

export type ShowMoreControlUI = {
  label: string;
  open: boolean;
  onClick: () => void;
};

export type RadioOptionUI = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type CityOption = {
  id: number;
  name: string;
  slug?: string;
};

export type FiltersBlockUIProps = {
  appliedCount?: number;
  onReset: () => void;

  intent: {
    name: string;
    title?: string;
    options: RadioOptionUI[];
    value: string;
    onChange: (value: string) => void;
  };

  skills: {
    title: string;
    categories: Category[];
    expandedCategoryIds: number[];
    onToggleExpandCategory: (categoryId: number) => void;
    selectedSubcategoryIds: number[];
    onToggleSubcategory: (subcategoryId: number, checked: boolean) => void;
    showMore: ShowMoreControlUI;
  };

  authorGender: {
    name: string;
    title: string;
    options: RadioOptionUI[];
    value: string;
    onChange: (value: string) => void;
  };

  city: {
    label: string;
    items: CityOption[];
    selectedCityIds: number[];
    onToggleCity: (cityId: number, checked: boolean) => void;
    showMore: ShowMoreControlUI;
  };
};
