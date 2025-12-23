import { useEffect, useMemo, useRef, type FC } from 'react';
import { useNavigate } from 'react-router-dom';
// import { SkillsListTest } from '@features/SkillsListTest';
import { useDispatch, useSelector } from '@store/store';
import { fetchSkills, resetList, selectSkillsByList, selectSkillsList } from '@slices/skills/skillsSlice';
import { setDebouncedQuery, setQuery } from '@slices/skills/searchSlice';
import { setGender, setMode, setSubcategories } from '@slices/skills/filtersSlice';
import { Skill } from '@api/types';
import { mediaUrl } from '@api/api';
import { CatalogCardUI } from '@components/catalog-card';
// import styles from './home.module.css';

// export const HomePage: FC = () => <SkillsListTest />;

// тестовая карточка, для проверки логики, не часть приложения
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

// попытка поюзать имеющийся CatalogCardUI
const CatalogCard = ({ skill }: { skill: Skill }) => {
  const navigate = useNavigate();

  const avatar = mediaUrl(skill.author.avatar);
  const { name } = skill.author;
  const ageText = String(formatAge(skill.author.birthDate)) || '';
  const cityName = skill.author.city.name;
  const teachTag = { label: skill.title, bgColor: skill.category.color };
  const learnTags = skill.author.learnSubcategories.map((subcat) => ({
    id: subcat.id,
    label: subcat.name,
    bgColor: '#F5F5F5', // todo: добавить цвет в фистуры к learnSubcategories
  }));
  const likesCount = skill.favoritesCount;
  const { isFavorited } = skill;
  const onDetailsClick = () => {
    navigate(`/skills/:${skill.id}`);
  };
  const onFavoriteToggle = (nextValue: boolean) => {};

  return (
    <CatalogCardUI
      avatar={avatar}
      name={name}
      ageText={ageText}
      cityName={cityName}
      teachTag={teachTag}
      learnTags={learnTags}
      likesCount={likesCount}
      isFavorited={isFavorited}
      onDetailsClick={onDetailsClick}
      onFavoriteToggle={onFavoriteToggle}
    />
  );
};

// вариант с просто захардкоженой карточкой, можно взаимно подменять с CatalogCard
const SkillCard = ({ skill }: { skill: Skill }) => {
  const age = formatAge(skill.author.birthDate);
  const avatarUrl = mediaUrl(skill.author.avatar);
  const cityName = skill.author.city?.name;

  const learnList = skill.author.learnSubcategories ?? [];
  const maxLearnChips = 2;
  const shownLearn = learnList.slice(0, maxLearnChips);
  const extraCount = learnList.length - shownLearn.length;

  const teachColor = skill.category.color || '#F5F5F5';

  return (
    <article
      style={{
        borderRadius: 16,
        padding: 16,
        backgroundColor: '#FFFFFF',
        boxShadow: '0 8px 24px rgba(15, 35, 52, 0.06)',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      {/* Верхняя часть: аватар + имя + избранное */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: 8,
        }}
      >
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <img
            src={avatarUrl}
            alt={`Аватар ${skill.author.name}`}
            width={48}
            height={48}
            style={{
              borderRadius: '50%',
              objectFit: 'cover',
            }}
          />
          <div>
            <div
              style={{
                fontWeight: 600,
                fontSize: 16,
                lineHeight: '20px',
              }}
            >
              {skill.author.name}
            </div>
            <div
              style={{
                fontSize: 13,
                lineHeight: '16px',
                color: '#7A7A7A',
              }}
            >
              {cityName}
              {age !== null ? `, ${age} лет` : null}
            </div>
          </div>
        </div>

        {/* Заглушка под сердечко */}
        <button
          type="button"
          aria-label={skill.isFavorited ? 'Удалить из избранного' : 'Добавить в избранное'}
          style={{
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            fontSize: 18,
            lineHeight: 1,
          }}
        >
          {skill.isFavorited ? '💚' : '🤍'}
        </button>
      </header>

      {/* Может научить */}
      <section>
        <div
          style={{
            fontSize: 13,
            fontWeight: 600,
            marginBottom: 6,
          }}
        >
          Может научить:
        </div>
        <div
          style={{
            display: 'inline-flex',
            padding: '4px 10px',
            borderRadius: 999,
            fontSize: 13,
            lineHeight: '16px',
            backgroundColor: teachColor,
            color: '#40302A',
            maxWidth: '100%',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
          title={skill.subcategory.name}
        >
          {skill.subcategory.name}
        </div>
      </section>

      {/* Хочет научиться */}
      {learnList.length > 0 && (
        <section>
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              marginBottom: 6,
            }}
          >
            Хочет научиться:
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 8,
            }}
          >
            {shownLearn.map((sub) => (
              <span
                key={sub.id}
                style={{
                  padding: '4px 10px',
                  borderRadius: 999,
                  fontSize: 13,
                  lineHeight: '16px',
                  backgroundColor: '#F3F4F6',
                  color: '#333333',
                  maxWidth: '100%',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
                title={sub.name}
              >
                {sub.name}
              </span>
            ))}

            {extraCount > 0 && (
              <span
                style={{
                  padding: '4px 10px',
                  borderRadius: 999,
                  fontSize: 13,
                  lineHeight: '16px',
                  backgroundColor: '#EEF1F7',
                  color: '#555',
                }}
              >
                +{extraCount}
              </span>
            )}
          </div>
        </section>
      )}

      {/* Кнопка */}
      <button
        type="button"
        style={{
          marginTop: 8,
          width: '100%',
          border: 'none',
          borderRadius: 999,
          padding: '10px 16px',
          backgroundColor: '#88C244',
          color: '#FFFFFF',
          fontWeight: 600,
          fontSize: 14,
          cursor: 'pointer',
        }}
      >
        Подробнее
      </button>
    </article>
  );
};

export const HomePage: FC = () => {
  // пример работы со skills (без фильтра по городам)
  const filters = useSelector((store) => store.filters);
  const query = useSelector((store) => store.search.query);
  const search = useSelector((store) => store.search.debouncedQuery);
  const dispatch = useDispatch();
  const isFilterActive = filters.gender !== 'любой' || filters.subcategoryId.length > 0 || search !== '';
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const recommendedSentinelRef = useRef<HTMLDivElement | null>(null);

  const popular = useSelector(selectSkillsByList('home:popular'));
  const newest = useSelector(selectSkillsByList('home:new'));
  const recommended = useSelector(selectSkillsByList('home:recommended'));
  const filteredSkills = useSelector(selectSkillsByList('filters'));

  const popularMeta = useSelector(selectSkillsList('home:popular'));
  const newestMeta = useSelector(selectSkillsList('home:new'));
  const recommendedMeta = useSelector(selectSkillsList('home:recommended'));
  const filteredMeta = useSelector(selectSkillsList('filters'));

  const popularTop3 = useMemo(() => popular.slice(0, 3), [popular]);
  const newestTop3 = useMemo(() => newest.slice(0, 3), [newest]);

  useEffect(() => {
    const id = setTimeout(() => {
      dispatch(setDebouncedQuery(query.trim()));
    }, 400); // дебаунс на 400мс

    return () => clearTimeout(id);
  }, [query, dispatch]);

  useEffect(() => {
    const hasSearch = Boolean(search?.trim());
    const hasGender = filters.gender !== 'любой';
    const hasSubcats = filters.subcategoryId.length > 0;
    // т.к. mode не должен триггерить запрос сам по себе
    const shouldRequest = hasSearch || hasGender || hasSubcats;
    if (!shouldRequest) return;

    dispatch(resetList('filters'));

    dispatch(
      fetchSkills({
        listKey: 'filters',
        params: {
          page: 1,
          page_size: 18,
          ordering: '-createdAt',
          search,
          ...filters,
        },
      }),
    );
  }, [dispatch, filters, search]);

  // инфинит скрол для списка filters (подргужаем довую пачку данных когда добрались до обсервера)
  useEffect(() => {
    if (!isFilterActive) return undefined;
    if (!sentinelRef.current) return undefined;
    if (!filteredMeta?.hasMore) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !filteredMeta.loading) {
          dispatch(
            fetchSkills({
              listKey: 'filters',
              append: true,
              params: {
                page: filteredMeta.page,
                page_size: filteredMeta.pageSize,
                ordering: '-createdAt',
                search,
                ...filters,
              },
            }),
          );
        }
      },
      { rootMargin: '200px' }, // отступ, по которому сработает подгрузка инфинит скрола
    );

    observer.observe(sentinelRef.current);

    return () => {
      observer.disconnect();
    };
  }, [isFilterActive, filteredMeta, filters, search]);

  // инфинит скрол для списка recomended
  useEffect(() => {
    if (isFilterActive) return undefined;
    if (!recommendedMeta?.hasMore) return undefined;
    if (!recommendedSentinelRef.current) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        if (recommendedMeta.loading) return;

        dispatch(
          fetchSkills({
            listKey: 'home:recommended',
            append: true,
            params: {
              page: recommendedMeta.page,
              page_size: recommendedMeta.pageSize,
            },
          }),
        );
      },
      { rootMargin: '200px' },
    );

    observer.observe(recommendedSentinelRef.current);

    return () => {
      observer.disconnect();
    };
  }, [isFilterActive, recommendedMeta, dispatch]);

  const toggleSubcategory = (id: number) => {
    const arr = filters.subcategoryId ?? [];
    if (arr.includes(id)) {
      dispatch(setSubcategories(arr.filter((x) => x !== id)));
    } else {
      dispatch(setSubcategories([...arr, id]));
    }
  };

  // todo: замменить захардкоженую далее разметку, на компоненты приложения
  return (
    <div style={{ display: 'grid', gap: 24 }}>
      <div style={{ display: 'flex', gap: 24 }}>
        <section>
          <h3>Пол автора</h3>

          <div>
            <label htmlFor="gender-any">
              <input
                id="gender-any"
                type="radio"
                name="gender"
                value="любой"
                checked={filters.gender === 'любой'}
                onChange={() => dispatch(setGender('любой'))}
              />
              Любой
            </label>
          </div>

          <div>
            <label htmlFor="gender-male">
              <input
                id="gender-male"
                type="radio"
                name="gender"
                value="мужской"
                checked={filters.gender === 'мужской'}
                onChange={() => dispatch(setGender('мужской'))}
              />
              Мужской
            </label>
          </div>

          <div>
            <label htmlFor="gender-female">
              <input
                id="gender-female"
                type="radio"
                name="gender"
                value="женский"
                checked={filters.gender === 'женский'}
                onChange={() => dispatch(setGender('женский'))}
              />
              Женский
            </label>
          </div>
        </section>

        <section>
          <h3>Где искать навык</h3>

          <div>
            <label htmlFor="mode-all">
              <input
                id="mode-all"
                type="radio"
                name="mode"
                value="all"
                checked={filters.mode === 'all'}
                onChange={() => dispatch(setMode('all'))}
              />
              Везде (teach + learn)
            </label>
          </div>

          <div>
            <label htmlFor="mode-teach">
              <input
                id="mode-teach"
                type="radio"
                name="mode"
                value="teach"
                checked={filters.mode === 'teach'}
                onChange={() => dispatch(setMode('teach'))}
              />
              Преподаёт (teach)
            </label>
          </div>

          <div>
            <label htmlFor="mode-learn">
              <input
                id="mode-learn"
                type="radio"
                name="mode"
                value="learn"
                checked={filters.mode === 'learn'}
                onChange={() => dispatch(setMode('learn'))}
              />
              Хочет научиться (learn)
            </label>
          </div>
        </section>
        <section>
          <h3>Subcategories (хардкод для теста)</h3>

          <label htmlFor="english">
            <input
              id="english"
              type="checkbox"
              checked={filters.subcategoryId.includes(9)}
              onChange={() => toggleSubcategory(9)}
            />
            Английский
          </label>

          <label htmlFor="german">
            <input
              id="german"
              type="checkbox"
              checked={filters.subcategoryId.includes(12)}
              onChange={() => toggleSubcategory(12)}
            />
            Немецкий
          </label>

          <label htmlFor="japanise">
            <input
              id="japanise"
              type="checkbox"
              checked={filters.subcategoryId.includes(14)}
              onChange={() => toggleSubcategory(14)}
            />
            Японский
          </label>
        </section>

        <section>
          <h3>Поиск</h3>
          <label htmlFor="search">
            <span style={{ marginRight: 8 }}>Искать:</span>
            <input
              id="search"
              type="text"
              value={query}
              onChange={(e) => dispatch(setQuery(e.target.value))}
              placeholder="Например, английский или тайм-менеджмент"
              style={{
                padding: '6px 10px',
                borderRadius: 8,
                border: '1px solid #ccc',
                minWidth: 280,
              }}
            />
          </label>
        </section>
      </div>

      {isFilterActive ? (
        <section>
          <h2>Результаты</h2>

          {filteredMeta?.loading && <p>Загрузка…</p>}
          {filteredMeta?.error && <p>Ошибка: {filteredMeta.error}</p>}

          <div
            style={{
              display: 'grid',
              gap: 12,
              gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            }}
          >
            {filteredSkills.map((skill) => (
              <CatalogCard key={skill.id} skill={skill} />
            ))}
          </div>

          {/* sentinel */}
          {filteredMeta?.hasMore && <div ref={sentinelRef} style={{ height: 1 }} />}
          {filteredMeta?.loading && <p>Загрузка…</p>}
        </section>
      ) : (
        <>
          <section>
            <h2>Популярное</h2>
            {popularMeta?.loading && <p>Загрузка…</p>}
            {popularMeta?.error && <p>Ошибка: {popularMeta.error}</p>}
            <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>
              {popularTop3.map((skill) => (
                <CatalogCard key={skill.id} skill={skill} />
              ))}
            </div>
          </section>

          <section>
            <h2>Новое</h2>
            {newestMeta?.loading && <p>Загрузка…</p>}
            {newestMeta?.error && <p>Ошибка: {newestMeta.error}</p>}
            <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>
              {newestTop3.map((skill) => (
                <CatalogCard key={skill.id} skill={skill} />
              ))}
            </div>
          </section>

          <section>
            <h2>Рекомендуем</h2>
            {recommendedMeta?.loading && <p>Загрузка…</p>}
            {recommendedMeta?.error && <p>Ошибка: {recommendedMeta.error}</p>}
            <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>
              {recommended.map((skill) => (
                <CatalogCard key={skill.id} skill={skill} />
              ))}
            </div>
            {/* sentinel */}
            {recommendedMeta?.hasMore && <div ref={recommendedSentinelRef} style={{ height: 1 }} />}
            {recommendedMeta?.loading && <p>Загрузка…</p>}
          </section>
        </>
      )}
    </div>
  );
};

export default HomePage;
