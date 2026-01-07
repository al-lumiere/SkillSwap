const getYearsWord = (age: number) => {
  const mod10 = age % 10;
  const mod100 = age % 100;
  if (mod10 === 1 && mod100 !== 11) return 'год';
  if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return 'года';
  return 'лет';
};

const parseBirthDate = (birthDate: string) => {
  const parts = birthDate.split('-');
  if (parts.length !== 3) return null;
  const isIsoLike = parts[0].length === 4;
  const year = Number(isIsoLike ? parts[0] : parts[2]);
  const month = Number(parts[1]);
  const day = Number(isIsoLike ? parts[2] : parts[0]);

  if (!day || !month || !year) return null;
  return { day, month, year };
};

const formatAge = (birthDate: string | undefined): string | null => {
  if (!birthDate) return null;
  const parsed = parseBirthDate(birthDate);
  if (!parsed) return null;
  const { day, month, year } = parsed;
  const birth = new Date(year, month - 1, day);
  const now = new Date();

  let age = now.getFullYear() - birth.getFullYear();
  const m = now.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) {
    age -= 1;
  }

  if (!Number.isFinite(age) || age < 0) return null;
  return `${age} ${getYearsWord(age)}`;
};

export default formatAge;
