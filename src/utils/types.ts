export type City = {
  id: number;
  slug: string;
  name: string;
};

export type Subcategory = {
  id: number;
  categoryId: number;
  name: string;
  slug: string;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  color: string;
  subcategories: Subcategory[];
};

export type Author = {
  id: number;
  name: string;
  avatar: string;
  birthDate: string;
  gender: string;
  bio: string;
  city: City;
  learnSubcategories: Subcategory[];
};

export type Skill = {
  id: number;
  title: string;
  category: Category;
  subcategory: Subcategory;
  description: string;
  favoritesCount: number;
  isFavorited: boolean;
  images: string[];
  author: Author;
};

export type UserSkill = {
  id: number;
  title: string;
  category: Category;
  subcategory: Subcategory;
  description: string;
  favoritesCount: number;
  isFavorited: boolean;
  images: string[];
};

export type User = Author & {
  skills: UserSkill[];
};
