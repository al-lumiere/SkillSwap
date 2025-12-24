import type { Meta, StoryObj } from '@storybook/react-vite';
import BookIcon from '@icons/book-icon';
import BriefcaseIcon from '@icons/briefcase-icon';
import GlobalIcon from '@icons/global-icon';
import HomeIcon from '@icons/home-icon';
import LifestyleIcon from '@icons/lifestyle-icon';
import PaletteIcon from '@icons/palette-icon';
import { MenuUI } from './menu-ui';

const meta: Meta<typeof MenuUI> = {
  title: 'UI/MenuUI',
  component: MenuUI,
  args: {
    categories: [
      {
        title: 'Бизнес и карьера',
        bgColor: '#E7F2F6',
        icon: <BriefcaseIcon />,
        subcategories: [
          { id: 1, categoryId: 1, name: 'Управление командой', slug: 'team-management' },
          { id: 2, categoryId: 1, name: 'Маркетинг и реклама', slug: 'marketing' },
          { id: 3, categoryId: 1, name: 'Продажи и переговоры', slug: 'sales' },
          { id: 4, categoryId: 1, name: 'Личный бренд', slug: 'personal-brand' },
          { id: 5, categoryId: 1, name: 'Резюме и собеседование', slug: 'resume-and-interview' },
          { id: 6, categoryId: 1, name: 'Тайм-менеджмент', slug: 'time-management' },
          { id: 7, categoryId: 1, name: 'Проектное управление', slug: 'project-management' },
          { id: 8, categoryId: 1, name: 'Предпринимательство', slug: 'entrepreneurship' },
        ],
      },
      {
        title: 'Творчество и искусство',
        bgColor: '#F7E7F2',
        icon: <PaletteIcon />,
        subcategories: [
          { id: 10, categoryId: 2, name: 'Рисование и иллюстрация', slug: 'illustration' },
          { id: 11, categoryId: 2, name: 'Фотография', slug: 'photography' },
          { id: 12, categoryId: 2, name: 'Видеомонтаж', slug: 'video-editing' },
          { id: 13, categoryId: 2, name: 'Музыка и звук', slug: 'music-and-sound' },
          { id: 14, categoryId: 2, name: 'Актёрское мастерство', slug: 'acting' },
          { id: 15, categoryId: 2, name: 'Креативное письмо', slug: 'creative-writing' },
          { id: 16, categoryId: 2, name: 'Арт-терапия', slug: 'art-therapy' },
          { id: 17, categoryId: 2, name: 'Декор и DIY', slug: 'decor-and-diy' },
        ],
      },
      {
        title: 'Иностранные языки',
        bgColor: '#EBE5C5',
        icon: <GlobalIcon />,
        subcategories: [
          { id: 20, categoryId: 3, name: 'Английский', slug: 'english' },
          { id: 21, categoryId: 3, name: 'Французский', slug: 'french' },
          { id: 22, categoryId: 3, name: 'Испанский', slug: 'spanish' },
          { id: 23, categoryId: 3, name: 'Немецкий', slug: 'german' },
          { id: 24, categoryId: 3, name: 'Китайский', slug: 'chinese' },
          { id: 25, categoryId: 3, name: 'Японский', slug: 'japanese' },
          { id: 26, categoryId: 3, name: 'Подготовка к экзаменам (IELTS, TOEFL)', slug: 'exams' },
        ],
      },
      {
        title: 'Образование и развитие',
        bgColor: '#E8ECF7',
        icon: <BookIcon />,
        subcategories: [
          { id: 30, categoryId: 4, name: 'Личностное развитие', slug: 'personal-growth' },
          { id: 31, categoryId: 4, name: 'Навыки обучения', slug: 'learning-skills' },
          { id: 32, categoryId: 4, name: 'Когнитивные техники', slug: 'cognitive-techniques' },
          { id: 33, categoryId: 4, name: 'Скорочтение', slug: 'speed-reading' },
          { id: 34, categoryId: 4, name: 'Навыки преподавания', slug: 'teaching-skills' },
          { id: 35, categoryId: 4, name: 'Коучинг', slug: 'coaching' },
        ],
      },
      {
        title: 'Дом и уют',
        bgColor: '#F7E7E7',
        icon: <HomeIcon />,
        subcategories: [
          { id: 40, categoryId: 5, name: 'Уборка и организация', slug: 'cleaning-and-organization' },
          { id: 41, categoryId: 5, name: 'Домашние финансы', slug: 'home-finance' },
          { id: 42, categoryId: 5, name: 'Приготовление еды', slug: 'cooking' },
          { id: 43, categoryId: 5, name: 'Домашние растения', slug: 'house-plants' },
          { id: 44, categoryId: 5, name: 'Ремонт', slug: 'repair' },
          { id: 45, categoryId: 5, name: 'Хранение вещей', slug: 'storage' },
        ],
      },
      {
        title: 'Здоровье и лайфстайл',
        bgColor: '#E9F7E7',
        icon: <LifestyleIcon />,
        subcategories: [
          { id: 50, categoryId: 6, name: 'Йога и медитация', slug: 'yoga-and-meditation' },
          { id: 51, categoryId: 6, name: 'Питание и ЗОЖ', slug: 'nutrition' },
          { id: 52, categoryId: 6, name: 'Ментальное здоровье', slug: 'mental-health' },
          { id: 53, categoryId: 6, name: 'Осознанность', slug: 'mindfulness' },
          { id: 54, categoryId: 6, name: 'Физические тренировки', slug: 'workouts' },
          { id: 55, categoryId: 6, name: 'Сон и восстановление', slug: 'sleep-and-recovery' },
          { id: 56, categoryId: 6, name: 'Баланс жизни и работы', slug: 'work-life-balance' },
        ],
      },
    ],
  },
  argTypes: {
    categories: { control: false },
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;

type Story = StoryObj<typeof MenuUI>;

export const Default: Story = {
  name: 'По макету',
};

export const OnlyTwoColumnsExample: Story = {
  name: '2 колонки (первые 4 категории)',
  args: {
    categories: (meta.args?.categories ?? []).slice(0, 4),
  },
};
