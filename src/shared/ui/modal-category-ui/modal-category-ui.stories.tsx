import type { Meta, StoryObj } from '@storybook/react-vite';
import BriefcaseIcon from '@icons/briefcase-icon';
import GlobalIcon from '@icons/global-icon';
import LifestyleIcon from '@icons/lifestyle-icon';
import PaletteIcon from '@icons/palette-icon';
import { ModalCategoryUI } from './modal-category-ui';

const meta: Meta<typeof ModalCategoryUI> = {
  title: 'UI/ModalCategoryUI',
  component: ModalCategoryUI,
  args: {
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
  argTypes: {
    title: { control: 'text' },
    bgColor: { control: 'color' },
    icon: { control: false },
    subcategories: { control: false },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof ModalCategoryUI>;

export const BusinessAndCareer: Story = {
  name: 'Бизнес и карьера',
};

export const CreativityAndArt: Story = {
  name: 'Творчество и искусство',
  args: {
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
};

export const ForeignLanguages: Story = {
  name: 'Иностранные языки',
  args: {
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
};

export const HealthAndLifestyle: Story = {
  name: 'Здоровье и лайфстайл',
  args: {
    title: 'Здоровье и лайфстайл',
    bgColor: '#E9F7E7',
    icon: <LifestyleIcon />,
    subcategories: [
      { id: 30, categoryId: 4, name: 'Йога и медитация', slug: 'yoga-and-meditation' },
      { id: 31, categoryId: 4, name: 'Питание и ЗОЖ', slug: 'nutrition' },
      { id: 32, categoryId: 4, name: 'Ментальное здоровье', slug: 'mental-health' },
      { id: 33, categoryId: 4, name: 'Осознанность', slug: 'mindfulness' },
      { id: 34, categoryId: 4, name: 'Физические тренировки', slug: 'workouts' },
      { id: 35, categoryId: 4, name: 'Сон и восстановление', slug: 'sleep-and-recovery' },
      { id: 36, categoryId: 4, name: 'Баланс жизни и работы', slug: 'work-life-balance' },
    ],
  },
};
