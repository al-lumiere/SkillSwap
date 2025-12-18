import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CatalogCardLayoutUI } from './catalog-card-layout';

const meta: Meta<typeof CatalogCardLayoutUI> = {
  title: 'widgets/CatalogCardLayout',
  component: CatalogCardLayoutUI,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof CatalogCardLayoutUI>;

export const Default: Story = {
  args: {
    avatar: 'https://placehold.co/120x120',
    name: 'Иван',
    ageText: '34 года',
    cityName: 'Санкт-Петербург',
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
    ],
    likesCount: 12,
    isFavorited: false,
  },
  render: ({ avatar, name, ageText, cityName, teachTag, learnTags, likesCount, isFavorited }) => {
    const [favorite, setFavorite] = useState(isFavorited);

    const handleFavoriteToggle = (nextValue: boolean) => {
      setFavorite(nextValue);
    };

    return (
      <CatalogCardLayoutUI
        avatar={avatar}
        name={name}
        ageText={ageText}
        cityName={cityName}
        teachTag={teachTag}
        learnTags={learnTags}
        likesCount={likesCount}
        isFavorited={favorite}
        onFavoriteToggle={handleFavoriteToggle}
      />
    );
  },
};
