// имитируем работу сервера, который осуществляет фильтрацию, поиск, сортировку и пагинацию
import type { DRFPaginated, Skill, SkillsQueryParams } from './types';

const FIXTURE_URL = import.meta.env.VITE_FIXTURE_URL as string;
// const BASE_PATH = 'http://localhost:5173/'
const BASE_PATH = '/api/v1/skills'; // “как будто эндпоинт”

function normalizeStr(s: string): string {
  return s.trim().toLowerCase();
}

function includesLoose(haystack: string, needle: string): boolean {
  return normalizeStr(haystack).includes(normalizeStr(needle));
}

function clampInt(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

function buildUrl(basePath: string, params: Record<string, string | string[]>): string {
  const usp = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (Array.isArray(v)) {
      v.forEach((x) => usp.append(k, x));
    } else {
      usp.set(k, v);
    }
  });
  const qs = usp.toString();
  return qs ? `${basePath}?${qs}` : basePath;
}

async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(`${FIXTURE_URL}${path}`);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} for ${path}`);
  }
  return res.json() as Promise<T>;
}

function applyFilters(skills: Skill[], params: SkillsQueryParams): Skill[] {
  let out = skills.slice();

  // mode
  const ids = params.subcategoryId ?? [];
  if (ids.length > 0) {
    const set = new Set(ids);

    if (params.mode === 'teach') {
      out = out.filter((s) => set.has(s.subcategory.id));
    } else if (params.mode === 'learn') {
      out = out.filter((s) => (s.author.learnSubcategories ?? []).some((x) => set.has(x.id)));
    } else {
      // mode === 'all' (или не задан) - ищем везде
      out = out.filter(
        (s) => set.has(s.subcategory.id) || (s.author.learnSubcategories ?? []).some((x) => set.has(x.id)),
      );
    }
  }

  // gender (в фикстурах "мужской/женский", лучше привести к male/female)
  if (params.gender && params.gender !== 'любой') {
    out = out.filter((s) => s.author.gender === params.gender);
  }

  // cityIds
  const cityIds = params.cityIds ?? []; // params.cityIds: number[] | undefined
  if (cityIds.length > 0) {
    const set = new Set(cityIds);
    out = out.filter((s) => {
      const authorCityId = s.author.city?.id;
      return typeof authorCityId === 'number' && set.has(authorCityId);
    });
  }

  // search
  if (params.search && params.search.trim()) {
    const q = params.search.trim();
    out = out.filter((s) => {
      const learnNames = (s.author.learnSubcategories ?? [])
        .map((x) => x.name)
        .join(' ')
        .toLowerCase();

      return (
        includesLoose(s.title, q) ||
        includesLoose(s.description, q) ||
        includesLoose(s.author.name, q) ||
        includesLoose(s.subcategory.name, q) ||
        includesLoose(s.category.name, q) ||
        includesLoose(learnNames, q)
      );
    });
  }

  return out;
}

function applyOrdering(skills: Skill[], ordering?: SkillsQueryParams['ordering']): Skill[] {
  if (!ordering) return skills;

  const desc = ordering.startsWith('-');
  const field = desc ? ordering.slice(1) : ordering;

  const getVal = (s: Skill): number | string => {
    switch (field) {
      case 'favoritesCount':
        return s.favoritesCount ?? 0;
      case 'createdAt':
        return s.createdAt ?? '';
      default:
        return 0;
    }
  };

  const sorted = [...skills].sort((a, b) => {
    const va = getVal(a);
    const vb = getVal(b);

    // createdAt сортируем как строку ISO (лексикографически работает)
    if (typeof va === 'string' || typeof vb === 'string') {
      const cmp = String(va).localeCompare(String(vb));
      return desc ? -cmp : cmp;
    }

    const cmp = (va as number) - (vb as number);
    return desc ? -cmp : cmp;
  });

  return sorted;
}

function paginateDRF<T>(items: T[], params: SkillsQueryParams): DRFPaginated<T> {
  const page = clampInt(params.page ?? 1, 1, 1_000_000);
  const pageSize = clampInt(params.page_size ?? 12, 1, 100);

  const count = items.length;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  const results = items.slice(start, end);

  // next/previous URLs
  const common: Record<string, string | string[]> = {};

  common.page_size = String(pageSize);
  if (params.ordering) common.ordering = params.ordering;
  if (params.search) common.search = params.search;

  if (params.mode) common.mode = params.mode;
  if (params.gender) common.gender = params.gender;
  if (params.cityIds?.length) common.cityIds = params.cityIds.map(String);
  if (params.subcategoryId?.length) common.subcategoryId = params.subcategoryId.map(String);

  const hasPrev = page > 1;
  const hasNext = end < count;

  const previous = hasPrev ? buildUrl(BASE_PATH, { ...common, page: String(page - 1) }) : null;
  const next = hasNext ? buildUrl(BASE_PATH, { ...common, page: String(page + 1) }) : null;

  return { count, next, previous, results };
}

// с настоящим сервером getSkills должен сформировать квери строку из полученных параметров
// и отправить запрос на сервер, тот сам сделает фильтрацию/поиск/сортировку/пагинацию и
// вернет результат. Тут же, мы всю обработку имитируем локально
export const skillsApi = {
  async getSkills(params: SkillsQueryParams = {}): Promise<DRFPaginated<Skill>> {
    const all = await fetchJson<Skill[]>('skills.json');

    // фильтры/поиск
    let filtered = applyFilters(all, params);

    // ordering (если не задан — можно задать дефолт)
    // Например для “Новое”: ordering = '-createdAt'
    // Для “Популярное”: ordering = '-favoritesCount'
    filtered = applyOrdering(filtered, params.ordering);

    // пагинация (в стиле DRF)
    return paginateDRF(filtered, params);
  },
};
