import { Category, City, Skill } from './types';

const FIXTURE_URL = import.meta.env.VITE_FIXTURE_URL as string;
const MEDIA_URL = import.meta.env.VITE_MEDIA_URL as string;

async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(`${FIXTURE_URL}${path}`);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} for ${path}`);
  }
  return res.json() as Promise<T>;
}

// кеширование справочников
let citiesPromise: Promise<City[]> | null = null;
let categoriesPromise: Promise<Category[]> | null = null;

export function getCities(): Promise<City[]> {
  if (!citiesPromise) citiesPromise = fetchJson<City[]>('cities.json');
  return citiesPromise;
}

export function getCategories(): Promise<Category[]> {
  if (!categoriesPromise) categoriesPromise = fetchJson<Category[]>('categories.json');
  return categoriesPromise;
}

export const fixturesClient = {
  getSkills: () => fetchJson<Skill[]>('skills.json'),
  getCities,
  getCategories,
  // getUsers: () => fetchJson<User[]>('users.json'),
  // getSubcategories: () => fetchJson<Subcategory[]>('subcategories.json'),
};

export function mediaUrl(path: string) {
  return !path ? '' : `${MEDIA_URL}${path}`;
}
