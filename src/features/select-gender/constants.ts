export type GenderId = 'any' | 'male' | 'female';

export const GENDER_OPTIONS: { id: GenderId; label: string }[] = [
  { id: 'any', label: 'Не выбран' },
  { id: 'male', label: 'Мужской' },
  { id: 'female', label: 'Женский' },
];
