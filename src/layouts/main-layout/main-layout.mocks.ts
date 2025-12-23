import type { Category } from '@api/types';
import type { CityOption, RadioOptionUI } from '@components/filters-block/type';

export const INTENT_OPTIONS: RadioOptionUI[] = [
  { value: 'all', label: 'Всё' },
  { value: 'learn', label: 'Хочу научиться' },
  { value: 'teach', label: 'Могу научить' },
];

export const GENDER_OPTIONS: RadioOptionUI[] = [
  { value: 'any', label: 'Не имеет значения' },
  { value: 'male', label: 'Мужской' },
  { value: 'female', label: 'Женский' },
];

export const CATEGORIES: Category[] = [
  {
    id: 1,
    name: 'Бизнес и карьера',
    slug: 'career',
    color: '#00AA00',
    subcategories: [
      { id: 101, categoryId: 1, name: 'Управление командой', slug: 'team-management' },
      { id: 102, categoryId: 1, name: 'Маркетинг и реклама', slug: 'marketing' },
      { id: 103, categoryId: 1, name: 'Продажи и переговоры', slug: 'sales-negotiation' },
      { id: 104, categoryId: 1, name: 'Личный бренд', slug: 'personal-brand' },
      { id: 105, categoryId: 1, name: 'Резюме и собеседование', slug: 'cv-interview' },
      { id: 106, categoryId: 1, name: 'Тайм-менеджмент', slug: 'time-management' },
      { id: 107, categoryId: 1, name: 'Проектное управление', slug: 'project-management' },
      { id: 108, categoryId: 1, name: 'Предпринимательство', slug: 'entrepreneurship' },
    ],
  },
  {
    id: 2,
    name: 'Творчество и искусство',
    slug: 'art',
    color: '#00AA00',
    subcategories: [
      { id: 201, categoryId: 2, name: 'Рисование и иллюстрация', slug: 'drawing-illustration' },
      { id: 202, categoryId: 2, name: 'Фотография', slug: 'photography' },
      { id: 203, categoryId: 2, name: 'Видеомонтаж', slug: 'video-editing' },
      { id: 204, categoryId: 2, name: 'Музыка и звук', slug: 'music-audio' },
      { id: 205, categoryId: 2, name: 'Актёрское мастерство', slug: 'acting' },
      { id: 206, categoryId: 2, name: 'Креативное письмо', slug: 'creative-writing' },
      { id: 207, categoryId: 2, name: 'Арт-терапия', slug: 'art-therapy' },
      { id: 208, categoryId: 2, name: 'Декор и DIY', slug: 'decor-diy' },
    ],
  },
  {
    id: 3,
    name: 'Иностранные языки',
    slug: 'languages',
    color: '#00AA00',
    subcategories: [
      { id: 301, categoryId: 3, name: 'Английский', slug: 'english' },
      { id: 302, categoryId: 3, name: 'Французский', slug: 'french' },
      { id: 303, categoryId: 3, name: 'Испанский', slug: 'spanish' },
      { id: 304, categoryId: 3, name: 'Немецкий', slug: 'german' },
      { id: 305, categoryId: 3, name: 'Китайский', slug: 'chinese' },
      { id: 306, categoryId: 3, name: 'Японский', slug: 'japanese' },
      { id: 307, categoryId: 3, name: 'Подготовка к экзаменам (IELTS, TOEFL)', slug: 'exam-prep-ielts-toefl' },
    ],
  },
  {
    id: 4,
    name: 'Образование и развитие',
    slug: 'education',
    color: '#00AA00',
    subcategories: [
      { id: 401, categoryId: 4, name: 'Личностное развитие', slug: 'personal-development' },
      { id: 402, categoryId: 4, name: 'Навыки обучения', slug: 'learning-skills' },
      { id: 403, categoryId: 4, name: 'Когнитивные техники', slug: 'cognitive-techniques' },
      { id: 404, categoryId: 4, name: 'Скорочтение', slug: 'speed-reading' },
      { id: 405, categoryId: 4, name: 'Навыки преподавания', slug: 'teaching-skills' },
      { id: 406, categoryId: 4, name: 'Коучинг', slug: 'coaching' },
    ],
  },
  {
    id: 5,
    name: 'Дом и уют',
    slug: 'home',
    color: '#00AA00',
    subcategories: [
      { id: 501, categoryId: 5, name: 'Уборка и организация', slug: 'cleaning-organization' },
      { id: 502, categoryId: 5, name: 'Домашние финансы', slug: 'home-finance' },
      { id: 503, categoryId: 5, name: 'Приготовление еды', slug: 'cooking' },
      { id: 504, categoryId: 5, name: 'Домашние растения', slug: 'house-plants' },
      { id: 505, categoryId: 5, name: 'Ремонт', slug: 'repair' },
      { id: 506, categoryId: 5, name: 'Хранение вещей', slug: 'storage' },
    ],
  },
  {
    id: 6,
    name: 'Здоровье и лайфстайл',
    slug: 'health',
    color: '#00AA00',
    subcategories: [
      { id: 601, categoryId: 6, name: 'Йога и медитация', slug: 'yoga-meditation' },
      { id: 602, categoryId: 6, name: 'Питание и ЗОЖ', slug: 'nutrition-healthy-lifestyle' },
      { id: 603, categoryId: 6, name: 'Ментальное здоровье', slug: 'mental-health' },
      { id: 604, categoryId: 6, name: 'Осознанность', slug: 'mindfulness' },
      { id: 605, categoryId: 6, name: 'Физические тренировки', slug: 'workouts' },
      { id: 606, categoryId: 6, name: 'Сон и восстановление', slug: 'sleep-recovery' },
      { id: 607, categoryId: 6, name: 'Баланс жизни и работы', slug: 'work-life-balance' },
    ],
  },
];

export const CITIES: CityOption[] = [
  { id: 1, name: 'Москва' },
  { id: 2, name: 'Санкт-Петербург' },
  { id: 3, name: 'Новосибирск' },
  { id: 4, name: 'Екатеринбург' },
  { id: 5, name: 'Казань' },
];

type LearnTag = { id: number; label: string; bgColor: string };

export const MOCK_CARD_DATA: {
  teachTag: { label: string; bgColor: string };
  learnTags: LearnTag[];
} = {
  teachTag: {
    label: 'Игра на барабанах',
    bgColor: '#E8ECF7',
  },
  learnTags: [
    { id: 1, label: 'Тайм менеджмент', bgColor: '#E9F7E7' },
    { id: 2, label: 'Медитация', bgColor: '#E9F7E7' },
    { id: 3, label: 'Йога', bgColor: '#E9F7E7' },
    { id: 4, label: 'Плавание', bgColor: '#E9F7E7' },
  ],
};

export const DEFAULT_INTENT = 'all';
export const DEFAULT_GENDER = 'any';

export type CatalogCardMock = {
  id: number;
  name: string;
  city: string;
  age: string;
  likes: number;
  favorited: boolean;
};

export const INITIAL_CARDS: CatalogCardMock[] = [
  { id: 0, name: 'Иван', city: 'Санкт-Петербург', age: '34 года', likes: 5, favorited: false },
  { id: 1, name: 'Виктория', city: 'Кемерово', age: '30 лет', likes: 15, favorited: false },
  { id: 2, name: 'Елена', city: 'Красноярск', age: '28 лет', likes: 25, favorited: true },
];
