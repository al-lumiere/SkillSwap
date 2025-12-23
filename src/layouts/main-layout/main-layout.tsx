import { Suspense, useState } from 'react';
import { HeaderUI } from '@components/header';
import { FooterLayout } from '@components/footer';
import { FiltersBlockUI } from '@components/filters-block';
import { SectionUI } from '@components/section';
import { CatalogCardUI } from '@components/catalog-card/catalog-card';
import { ButtonUI } from '@ui/button';

import ChevronRightIcon from '@icons/chevron-right-icon';

import { useCatalogFilters } from './use-filters-block';
import { MOCK_CARD_DATA, INITIAL_CARDS } from './main-layout.mocks';

import styles from './main-layout.module.css';

export const MainLayout = () => {
  const [searchValue, setSearchValue] = useState('');

  const { filtersProps } = useCatalogFilters();
  const { appliedCount, onReset, intent, skills, authorGender, city } = filtersProps;

  const [cards, setCards] = useState(INITIAL_CARDS);

  const handleFavoriteToggle = (cardId: number, nextValue: boolean) => {
    setCards((prevCards) =>
      prevCards.map((card) =>
        card.id === cardId
          ? { ...card, favorited: nextValue, likes: nextValue ? card.likes + 1 : card.likes - 1 }
          : card,
      ),
    );
  };

  return (
    <div className={styles.wrapper}>
      <HeaderUI
        variant="full"
        isUserAuth={false}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        onSearchClear={() => setSearchValue('')}
      />

      <main className={styles.main}>
        <Suspense fallback="Загружаем...">
          <FiltersBlockUI
            appliedCount={appliedCount}
            onReset={onReset}
            intent={intent}
            skills={skills}
            authorGender={authorGender}
            city={city}
          />

          <SectionUI
            title="Популярное"
            actionButton={
              <ButtonUI variant="tertiary" onClick={() => console.log('')} padding="12px 24px">
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
                teachTag={MOCK_CARD_DATA.teachTag}
                learnTags={MOCK_CARD_DATA.learnTags}
                likesCount={card.likes}
                isFavorited={card.favorited}
                onDetailsClick={() => console.log(`Details clicked for ${card.name}`)}
                onFavoriteToggle={(value) => handleFavoriteToggle(card.id, value)}
              />
            ))}
          </SectionUI>
        </Suspense>
      </main>

      <FooterLayout />
    </div>
  );
};
