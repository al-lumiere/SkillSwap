const formatAge = (birthDate: string | undefined): number | null => {
  if (!birthDate) return null;
  // "DD-MM-YYYY", например "01-01-2001"
  const [day, month, year] = birthDate.split('-').map(Number);
  if (!day || !month || !year) return null;

  const birth = new Date(year, month - 1, day);
  const now = new Date();

  let age = now.getFullYear() - birth.getFullYear();
  const m = now.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) {
    age -= 1;
  }
  return age;
};

export default formatAge;
