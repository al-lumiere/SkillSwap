import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { ButtonUI } from '@ui/button';
import { SwiperNavigation } from '@ui/swiper-navigation';
import ChevronRightIcon from '@icons/chevron-right-icon';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SectionUI } from './section';
import { CatalogCardUI } from '../catalog-card';
import styles from './section.module.css';

// import Swiper styles
import 'swiper/css';

const meta: Meta<typeof SectionUI> = {
  title: 'ui/SectionLayout',
  component: SectionUI,
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

type Story = StoryObj<typeof SectionUI>;

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
    const [cards, setCards] = useState([
      { id: 0, name: 'Иван', city: 'Санкт-Петербург', age: '34 года', likes: 5, favorited: false },
      { id: 1, name: 'Виктория', city: 'Кемерово', age: '30 лет', likes: 15, favorited: false },
      { id: 2, name: 'Елена', city: 'Красноярск', age: '28 лет', likes: 25, favorited: true },
    ]);

    const handleFavoriteToggle = (cardId: number, nextValue: boolean) => {
      setCards((prevCards) =>
        prevCards.map((card) =>
          card.id === cardId
            ? {
                ...card,
                favorited: nextValue,
                likes: nextValue ? card.likes + 1 : card.likes - 1,
              }
            : card,
        ),
      );
    };

    return (
      <div style={{ width: '1020px' }}>
        <SectionUI
          title="Популярное"
          actionButton={
            <ButtonUI variant="tertiary" onClick={() => console.log('')}>
              Смотреть все
              <ChevronRightIcon />
            </ButtonUI>
          }
        >
          {cards.map((card) => (
            <CatalogCardUI
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
              onFavoriteToggle={(value) => handleFavoriteToggle(card.id, value)}
            />
          ))}
        </SectionUI>
      </div>
    );
  },
};

export const RecommendedWithoutButton: Story = {
  render: () => {
    const [cards, setCards] = useState([
      { id: 0, name: 'Иван', city: 'Санкт-Петербург', age: '34 года', likes: 5, favorited: false },
      { id: 1, name: 'Виктория', city: 'Кемерово', age: '30 лет', likes: 15, favorited: false },
      { id: 2, name: 'Елена', city: 'Красноярск', age: '28 лет', likes: 25, favorited: true },
      { id: 3, name: 'Константин', city: 'Иркутск', age: '36 лет', likes: 35, favorited: false },
      { id: 4, name: 'София', city: 'Абакан', age: '24 года', likes: 45, favorited: false },
      { id: 5, name: 'Екатерина', city: 'Пермь', age: '33 года', likes: 55, favorited: true },
    ]);

    const handleFavoriteToggle = (cardId: number, nextValue: boolean) => {
      setCards((prevCards) =>
        prevCards.map((card) =>
          card.id === cardId
            ? {
                ...card,
                favorited: nextValue,
                likes: nextValue ? card.likes + 1 : card.likes - 1,
              }
            : card,
        ),
      );
    };

    return (
      <div style={{ width: '1020px' }}>
        <SectionUI title="Рекомендуем">
          {cards.map((card) => (
            <CatalogCardUI
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
              onFavoriteToggle={(value) => handleFavoriteToggle(card.id, value)}
            />
          ))}
        </SectionUI>
      </div>
    );
  },
};

export const SimilarWithFilterButton: Story = {
  render: () => {
    const [cards, setCards] = useState([
      { id: 0, name: 'Иван', city: 'Санкт-Петербург', age: '34 года', likes: 5, favorited: false },
      { id: 1, name: 'Виктория', city: 'Кемерово', age: '30 лет', likes: 15, favorited: false },
      { id: 2, name: 'Елена', city: 'Красноярск', age: '28 лет', likes: 25, favorited: true },
      { id: 3, name: 'Константин', city: 'Иркутск', age: '36 лет', likes: 35, favorited: false },
      { id: 4, name: 'София', city: 'Абакан', age: '24 года', likes: 45, favorited: false },
      { id: 5, name: 'Екатерина', city: 'Пермь', age: '33 года', likes: 55, favorited: true },
    ]);
    const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

    const handleFavoriteToggle = (cardId: number, nextValue: boolean) => {
      setCards((prevCards) =>
        prevCards.map((card) =>
          card.id === cardId
            ? {
                ...card,
                favorited: nextValue,
                likes: nextValue ? card.likes + 1 : card.likes - 1,
              }
            : card,
        ),
      );
    };

    return (
      <div style={{ width: '100%', maxWidth: 1368 }}>
        <SectionUI title={`Похожие предложения: ${cards.length}`} hasSlider>
          <Swiper
            className={styles.swiper}
            spaceBetween={24}
            slidesPerView={4}
            observer
            observeParents
            onSwiper={setSwiperInstance}
          >
            {cards.map((card) => (
              <SwiperSlide key={card.id}>
                <CatalogCardUI
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
                  onFavoriteToggle={(value) => handleFavoriteToggle(card.id, value)}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <SwiperNavigation swiper={swiperInstance} />
        </SectionUI>
      </div>
    );
  },
};
