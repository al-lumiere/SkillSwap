import type { Meta, StoryObj } from '@storybook/react-vite';
import { SectionLayoutUI } from './section-layout';
import { CatalogCardLayoutUI } from '../catalog-card-layout';
import { Button } from '../../shared/ui/button';
import ChevronRightIcon from '../../shared/assets/icons/chevron-right-icon';
import SortIcon from '../../shared/assets/icons/sort-icon';

const meta: Meta<typeof SectionLayoutUI> = {
  title: 'widgets/SectionLayout',
  component: SectionLayoutUI,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Компонент секции с заголовком, кнопкой действия и контейнером для карточек',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    title: { control: 'text', description: 'Заголовок секции' },
    children: { control: false, description: 'Карточки каталога' },
    actionButton: { control: false, description: 'Кнопка действия (опционально)' },
  },
};

export default meta;

type Story = StoryObj<typeof SectionLayoutUI>;

// Моковые данные для карточек
const mockCardData = {
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

export const PopularWithButton: Story = {
  render: () => {
    const cards = [
      { id: 0, name: 'Иван', city: 'Санкт-Петербург', age: '34 года', likes: 5, favorited: false },
      { id: 1, name: 'Виктория', city: 'Кемерово', age: '30 лет', likes: 15, favorited: false },
      { id: 2, name: 'Елена', city: 'Красноярск', age: '28 лет', likes: 25, favorited: true },
    ];

    return (
      <div style={{ width: '1020px' }}>
        <SectionLayoutUI
          title="Популярное"
          actionButton={
            <Button variant="tertiary" onClick={() => console.log('')}>
              Смотреть все
              <ChevronRightIcon />
            </Button>
          }
        >
          {cards.map((card) => (
            <CatalogCardLayoutUI
              key={card.id}
              avatar={`https://i.pravatar.cc/150?img=${card.id + 1}`}
              name={card.name}
              cityName={card.city}
              ageText={card.age}
              teachTag={mockCardData.teachTag}
              learnTags={mockCardData.learnTags}
              likesCount={card.likes}
              isFavorited={card.favorited}
              onDetailsClick={() => console.log(`Details clicked for ${card.name}`)}
              onFavoriteToggle={(value) => console.log(`Favorite toggled for ${card.name}:`, value)}
            />
          ))}
        </SectionLayoutUI>
      </div>
    );
  },
};

export const RecommendedWithoutButton: Story = {
  render: () => {
    const cards = [
      { id: 0, name: 'Иван', city: 'Санкт-Петербург', age: '34 года', likes: 5, favorited: false },
      { id: 1, name: 'Виктория', city: 'Кемерово', age: '30 лет', likes: 15, favorited: false },
      { id: 2, name: 'Елена', city: 'Красноярск', age: '28 лет', likes: 25, favorited: true },
      { id: 3, name: 'Константин', city: 'Иркутск', age: '36 лет', likes: 35, favorited: false },
      { id: 4, name: 'София', city: 'Абакан', age: '24 года', likes: 45, favorited: false },
      { id: 5, name: 'Екатерина', city: 'Пермь', age: '33 года', likes: 55, favorited: true },
    ];

    return (
      <div style={{ width: '1020px' }}>
        <SectionLayoutUI title="Рекомендуем">
          {cards.map((card) => (
            <CatalogCardLayoutUI
              key={card.id}
              avatar={`https://i.pravatar.cc/150?img=${card.id + 1}`}
              name={card.name}
              cityName={card.city}
              ageText={card.age}
              teachTag={mockCardData.teachTag}
              learnTags={mockCardData.learnTags}
              likesCount={card.likes}
              isFavorited={card.favorited}
              onDetailsClick={() => console.log(`Details clicked for ${card.name}`)}
              onFavoriteToggle={(value) => console.log(`Favorite toggled for ${card.name}:`, value)}
            />
          ))}
        </SectionLayoutUI>
      </div>
    );
  },
};

export const SimilarWithFilterButton: Story = {
  render: () => {
    const cards = [
      { id: 0, name: 'Иван', city: 'Санкт-Петербург', age: '34 года', likes: 5, favorited: false },
      { id: 1, name: 'Виктория', city: 'Кемерово', age: '30 лет', likes: 15, favorited: false },
      { id: 2, name: 'Елена', city: 'Красноярск', age: '28 лет', likes: 25, favorited: true },
      { id: 3, name: 'Константин', city: 'Иркутск', age: '36 лет', likes: 35, favorited: false },
    ];

    return (
      <div style={{ width: '1368px' }}>
        <SectionLayoutUI
          title="Похожие предложения"
          actionButton={
            <Button variant="tertiary" onClick={() => console.log('')}>
              <SortIcon />
              Сначала новые
            </Button>
          }
        >
          {cards.map((card) => (
            <CatalogCardLayoutUI
              key={card.id}
              avatar={`https://i.pravatar.cc/150?img=${card.id + 1}`}
              name={card.name}
              cityName={card.city}
              ageText={card.age}
              teachTag={mockCardData.teachTag}
              learnTags={mockCardData.learnTags}
              likesCount={card.likes}
              isFavorited={card.favorited}
              onDetailsClick={() => console.log(`Details clicked for ${card.name}`)}
              onFavoriteToggle={(value) => console.log(`Favorite toggled for ${card.name}:`, value)}
            />
          ))}
        </SectionLayoutUI>
      </div>
    );
  },
};
