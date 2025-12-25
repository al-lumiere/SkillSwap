import type { Meta, StoryObj } from '@storybook/react-vite';
import { CardUserInfoUI } from './card-user-info';

const meta: Meta<typeof CardUserInfoUI> = {
  title: 'ui/CardUserInfoUI',
  component: CardUserInfoUI,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof CardUserInfoUI>;

export const Default: Story = {
  args: {
    avatar: 'https://placehold.co/120x120',
    name: 'Иван',
    ageText: '34 года',
    cityName: 'Санкт-Петербург',
    bio: 'Привет! Люблю ритм, кофе по утрам и людей, которые не боятся пробовать новое',
    teachTag: {
      label: 'Английский язык',
      bgColor: '#EBE5C5',
    },
    learnTags: [
      { id: 1, label: 'Тайм менеджмент', bgColor: '#E7F2F6' },
      { id: 2, label: 'Медитация', bgColor: '#E9F7E7' },
      {
        id: 3,
        label: 'Публичные выступления',
        bgColor: '#E9F7E7',
      },
      { id: 4, label: 'Учебные программы', bgColor: '#E7F2F6' },
    ],
  },
  render: ({ avatar, name, ageText, cityName, teachTag, learnTags, bio }) => (
    <CardUserInfoUI
      avatar={avatar}
      name={name}
      bio={bio}
      ageText={ageText}
      cityName={cityName}
      teachTag={teachTag}
      learnTags={learnTags}
    />
  ),
};
