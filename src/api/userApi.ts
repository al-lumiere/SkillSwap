import type {
  AuthUser,
  AuthResponse,
  RegisterPayload,
  LoginPayload,
  Category,
  Subcategory,
  UserSkill,
  UpdateProfilePayload,
  City,
  UpdateSkillPayload,
  ChangePasswordPayload,
} from './types';
import { fixturesClient } from './api';

const USERS_KEY = 'skillswap_users';
const TOKEN_KEY = 'access_token';

type StoredUser = AuthUser & { password: string };

// утилиты

// фейк-задержка, чтобы увидеть фолбеки
const delay = (ms = 400) =>
  new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });

function readUsers(): StoredUser[] {
  const raw = localStorage.getItem(USERS_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as StoredUser[];
  } catch {
    return [];
  }
}

function writeUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function generateTokenForUser(userId: number): string {
  const ts = Date.now();
  return `user-${userId}-${ts}`;
}

function parseUserIdFromToken(token: string): number | null {
  const match = token.match(/^user-(\d+)-\d+$/);
  if (!match) return null;
  return Number(match[1]);
}

function findSubcategoryInCategories(categories: Category[], subcategoryId: number): Subcategory | null {
  return categories.flatMap((c) => c.subcategories).find((s) => s.id === subcategoryId) ?? null;
}

function requireAuthedUserId(): number {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) throw new Error('Не авторизован');
  const userId = parseUserIdFromToken(token);
  if (!userId) throw new Error('Неверный токен');
  return userId;
}

function omitPassword(user: StoredUser): AuthUser {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...authUser } = user;
  return authUser;
}

// апи пользователя
async function registerUser(payload: RegisterPayload): Promise<AuthResponse> {
  // тут я складываю все объекты целиком в локалсторадж, но правельнее складывать только id'шники
  // для cityId, subcategoryId, skillCategoryId - а потом гидрировать при вызове getCurrentUser
  await delay();

  const users = readUsers();
  const exists = users.some((u) => u.email.toLowerCase() === payload.email.toLowerCase());
  if (exists) {
    throw new Error('Пользователь с таким email уже существует');
  }

  const newId = users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1;

  const cities = await fixturesClient.getCities();
  const categories = await fixturesClient.getCategories();

  const city = cities.find((c) => c.id === payload.cityId);
  if (!city) throw new Error(`Город с id=${payload.cityId} не найден`);

  const learnSub = findSubcategoryInCategories(categories, payload.learnSubcategoryId);
  if (!learnSub) throw new Error(`Подкатегория (learn) с id=${payload.learnSubcategoryId} не найдена`);

  const skillCategory = categories.find((c) => c.id === payload.skillCategoryId);
  if (!skillCategory) throw new Error(`Категория с id=${payload.skillCategoryId} не найдена`);

  const skillSub = skillCategory.subcategories.find((s) => s.id === payload.skillSubcategoryId);
  if (!skillSub) {
    throw new Error(
      `Подкатегория skillSubcategoryId=${payload.skillSubcategoryId} не принадлежит категории id=${payload.skillCategoryId}`,
    );
  }

  const nowIso = new Date().toISOString();

  const userSkill: UserSkill = {
    id: 1, // у нас один (и он же первый) скилл на пользователя, во сяком случае при регестрации
    title: payload.skillTitle,
    category: skillCategory,
    subcategory: skillSub,
    description: payload.skillDescription,
    favoritesCount: 0, // вообще, это не часть сущности скила, а динамическое значение которое должен определять сервак
    isFavorited: false,
    createdAt: nowIso,
    images: payload.skillImages,
  };

  const baseUser: AuthUser = {
    id: newId,
    email: payload.email,
    name: payload.name,
    avatar: payload.avatar ?? '',
    birthDate: payload.birthDate,
    gender: payload.gender,
    bio: payload.bio ?? '',
    city,
    learnSubcategories: [learnSub],
    skills: [userSkill],
  };

  const storedUser: StoredUser = { ...baseUser, password: payload.password };

  writeUsers([...users, storedUser]);

  const token = generateTokenForUser(newId);
  localStorage.setItem(TOKEN_KEY, token);

  return { token, user: baseUser };
}

async function loginUser(credentials: LoginPayload): Promise<AuthResponse> {
  await delay();

  const users = readUsers();
  const user = users.find(
    (u) => u.email.toLowerCase() === credentials.email.toLowerCase() && u.password === credentials.password,
  );

  if (!user) {
    throw new Error('Email или пароль введён неверно. Пожалуйста проверьте правильность введённых данных');
  }

  const token = generateTokenForUser(user.id);
  localStorage.setItem(TOKEN_KEY, token);

  const { password: pw, ...authUser } = user;
  return { token, user: authUser };
}

async function getCurrentUser(): Promise<AuthUser | null> {
  await delay(200);

  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) return null;

  const userId = parseUserIdFromToken(token);
  if (!userId) return null;

  const users = readUsers();
  const stored = users.find((u) => u.id === userId);
  if (!stored) return null;

  const { password: pw, ...authUser } = stored;
  return authUser;
}

async function logoutUser(): Promise<void> {
  await delay(100);
  localStorage.removeItem(TOKEN_KEY);
}

async function updateProfile(patch: UpdateProfilePayload): Promise<AuthUser> {
  await delay(500);

  const userId = requireAuthedUserId();
  const users = readUsers();
  const idx = users.findIndex((u) => u.id === userId);
  if (idx === -1) throw new Error('Пользователь не найден');

  let newCity: City | undefined;
  if (patch.cityId !== undefined) {
    const cities = await fixturesClient.getCities();
    newCity = cities.find((c) => c.id === patch.cityId);
    if (!newCity) throw new Error(`Город с id=${patch.cityId} не найден`);
  }

  let newLearnSub: Subcategory | undefined;
  if (patch.learnSubcategoryId !== undefined) {
    const categories = await fixturesClient.getCategories();
    newLearnSub = findSubcategoryInCategories(categories, patch.learnSubcategoryId) ?? undefined;
    if (!newLearnSub) throw new Error(`Подкатегория (learn) с id=${patch.learnSubcategoryId} не найдена`);
  }

  const prev = users[idx];

  // можно навешать валидаций по типу представленной
  if (patch.birthDate !== undefined && !String(patch.birthDate).trim()) {
    throw new Error('Некорректная дата рождения');
  }

  const updatedUser: StoredUser = {
    ...prev,
    email: patch.email ?? prev.email,
    name: patch.name ?? prev.name,
    birthDate: patch.birthDate ?? prev.birthDate,
    gender: patch.gender ?? prev.gender,
    bio: patch.bio ?? prev.bio,
    avatar: patch.avatar ?? prev.avatar,
    city: newCity ?? prev.city,
    learnSubcategories: newLearnSub ? [newLearnSub] : (prev.learnSubcategories ?? []),
  };

  const nextUsers = users.slice();
  nextUsers[idx] = updatedUser;
  writeUsers(nextUsers);

  return omitPassword(updatedUser);
}

// обновлние навыка мы пока не используем, сделал заготовку-скелет по аналогии, требует доработки/проверки
async function updateSkill(payload: UpdateSkillPayload): Promise<AuthUser> {
  await delay(200);

  const userId = requireAuthedUserId();
  const users = readUsers();
  const idx = users.findIndex((u) => u.id === userId);
  if (idx === -1) throw new Error('Пользователь не найден');

  const prev = users[idx];
  const skills = prev.skills ?? [];

  const skillIdx = skills.findIndex((s) => s.id === payload.skillId);
  if (skillIdx === -1) {
    throw new Error('Навык не найден. Добавление новых навыков запрещено.');
  }

  const prevSkill = skills[skillIdx];

  const updatedSkill = {
    ...prevSkill,
    title: payload.patch.title ?? prevSkill.title,
    description: payload.patch.description ?? prevSkill.description,
    images: payload.patch.images ?? prevSkill.images,
    // при включении метода надо будет “честно” собрать категорию/подкатегорию из справочника, пока просто заглушка обновляющая id
    category: payload.patch.categoryId ? { ...prevSkill.category, id: payload.patch.categoryId } : prevSkill.category,
    subcategory: payload.patch.subcategoryId
      ? { ...prevSkill.subcategory, id: payload.patch.subcategoryId }
      : prevSkill.subcategory,
  };

  const nextSkills = skills.slice();
  nextSkills[skillIdx] = updatedSkill;

  const nextUser: StoredUser = {
    ...prev,
    skills: nextSkills,
  };

  const nextUsers = users.slice();
  nextUsers[idx] = nextUser;
  writeUsers(nextUsers);

  return omitPassword(nextUser);
}

// в макете не показано как должен меняться пароль, но есть заглушка, добавил метод на всякий/на будущее
async function changePassword(payload: ChangePasswordPayload): Promise<void> {
  await delay(200);

  const userId = requireAuthedUserId();
  const users = readUsers();
  const idx = users.findIndex((u) => u.id === userId);
  if (idx === -1) throw new Error('Пользователь не найден');

  const prev = users[idx];

  if (payload.oldPassword !== prev.password) {
    throw new Error('Старый пароль неверный');
  }
  // валидацию по желанию
  if (!payload.newPassword.trim() || payload.newPassword.trim().length < 6) {
    throw new Error('Новый пароль слишком короткий');
  }

  const next: StoredUser = { ...prev, password: payload.newPassword };
  const nextUsers = users.slice();
  nextUsers[idx] = next;
  writeUsers(nextUsers);
}

// имитируем апи для пользователя, все через localStorage
export const userApi = {
  registerUser,
  loginUser,
  getCurrentUser,
  logoutUser,
  updateProfile,
  updateSkill,
  changePassword,
};
