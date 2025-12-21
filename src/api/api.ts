import { Category, City, Skill, Subcategory, User } from './types';

const FIXTURE_URL = import.meta.env.VITE_FIXTURE_URL as string;
const MEDIA_URL = import.meta.env.VITE_MEDIA_URL as string;

async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(`${FIXTURE_URL}${path}`);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} for ${path}`);
  }
  return res.json() as Promise<T>;
}

export const fixturesClient = {
  getSkills: () => fetchJson<Skill[]>('skills.json'),
  getUsers: () => fetchJson<User[]>('users.json'),
  getCities: () => fetchJson<City[]>('cities.json'),
  getCategories: () => fetchJson<Category[]>('categories.json'),
  getSubcategories: () => fetchJson<Subcategory[]>('subcategories.json'),
};

export function mediaUrl(path: string) {
  return !path ? '' : `${MEDIA_URL}${path}`;
}
