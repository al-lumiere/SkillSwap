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
  color: string;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  color: string;
  subcategories: Subcategory[];
};

export type Gender = 'any' | 'male' | 'female';

export type Author = {
  id: number;
  name: string;
  avatar: string;
  birthDate: string;
  gender: Gender;
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
  createdAt: string;
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
  gender?: Gender; // 'любой' | 'мужской' | 'женский'
  cityIds?: number[];
  favorites_only?: boolean; // страница избранного
  user_id?: number; // для избранного (возможно не понадобится, т.к. пользователь будет в запросе)
};

// авторизация и ко
export type AuthUser = User & {
  email: string;
};

export type AuthResponse = {
  token: string; // access token, без рефреша
  user: AuthUser;
};

// данные для регистрации (многошаговая форма в сумме)
export type RegisterPayload = {
  // Шаг 1
  email: string;
  password: string;

  // Шаг 2 — профиль
  name: string;
  birthDate: string; // 'YYYY-MM-DD'
  gender: Gender;
  cityId: number;
  learnSubcategoryId: number; // один штука
  avatar?: string; // должен быть предусмотрен фолбек
  bio?: string; // в форме регистрации нету, а в карточке и на персональной странице есть

  // Шаг 3 — свой навык
  skillTitle: string;
  skillCategoryId: number;
  skillSubcategoryId: number;
  skillDescription: string;
  skillImages: string[];
};

export type LoginPayload = {
  email: string;
  password: string;
};

// изменение/обновления пользователя
export type UpdateProfilePayload = Partial<{
  email: string;
  name: string;
  birthDate: string;
  gender: Gender;
  cityId: number;
  bio: string;
  avatar: string; // у нас dataURL (или media path , если будут ссылки)
  learnSubcategoryId: number;
}>;

export type UpdateSkillPayload = {
  skillId: number; // текущий id'шник скила, т.к. даю только возможность изменить существующий
  patch: Partial<{
    title: string;
    categoryId: number;
    subcategoryId: number;
    description: string;
    images: string[];
  }>;
};

export type ChangePasswordPayload = {
  oldPassword: string;
  newPassword: string;
};
