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
  createdAt: string; // "2025-12-10T14:22:00Z"
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

// skillsApi
export type DRFPaginated<T> = {
  count: number; // общее количество едениц ресурса
  next: string | null; // ссылка на следующую страницу
  previous: string | null; // ссылка на преыущую страницу
  results: T[]; // пагинированный кусок ресурса
};

export type SkillsQueryParams = {
  // Django-like
  page?: number; // 1-based
  page_size?: number; // как DRF PageNumberPagination
  ordering?: '-favoritesCount' | 'favoritesCount' | '-createdAt' | 'createdAt';
  search?: string; // как SearchFilter (q)

  // фильтры
  mode?: 'all' | 'teach' | 'learn'; // "Всё / Могу научить / Хочу научиться"
  subcategoryId?: number[]; // repeated query param: ?subcategoryId=9&subcategoryId=10
  // gender?: 'any' | 'male' | 'female';
  gender?: 'любой' | 'мужской' | 'женский'; // переделать на инглиш тут и в фикстурах
  cityIds?: number[];
  // список favorites запилить пожже, пока просто зарезервируем поля
  favorites_only?: boolean; // страница избранного
  user_id?: number; // для избранного (возможно не понадобится, т.к. пользователь будет в запросе)
};
