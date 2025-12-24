import { FC, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { SectionUI } from '@components/section';
import { ButtonUI } from '@ui/button';
import { CatalogCardUI } from '@components/catalog-card';
import { useDispatch, useSelector } from '@store/store';
import { fetchSkills, resetList, selectSkillsByList, selectSkillsList } from '@slices/skills/skillsSlice';
import SortIcon from '@icons/sort-icon';
import { Skill } from '@api/types';
import { mediaUrl } from '@api/api';
import formatAge from '../../shared/helpers/format-age';

export const FilteredSkills: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filters = useSelector((s) => s.filters);
  const search = useSelector((s) => s.search.debouncedQuery);

  const filteredSkills: Skill[] = useSelector(selectSkillsByList('filters'));
  const filteredMeta = useSelector(selectSkillsList('filters'));

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const hasSearch = Boolean(search?.trim());
    const hasGender = filters.gender !== 'any';
    const hasSubcats = filters.subcategoryId.length > 0;
    const hasCities = filters.cityIds.length > 0;
    const hasMode = filters.mode !== 'all';

    const shouldRequest = hasSearch || hasGender || hasSubcats || hasCities || hasMode;
    if (!shouldRequest) return;

    dispatch(resetList('filters'));

    dispatch(
      fetchSkills({
        listKey: 'filters',
        params: {
          page: 1,
          page_size: 18,
          ordering: '-createdAt',
          ...(hasSearch ? { search } : {}),
          ...(filters.mode !== 'all' ? { mode: filters.mode } : {}),
          ...(filters.gender !== 'any' ? { gender: filters.gender } : {}),
          ...(filters.subcategoryId.length ? { subcategoryId: filters.subcategoryId } : {}),
          ...(filters.cityIds.length ? { cityIds: filters.cityIds } : {}),
        },
      }),
    );
  }, [dispatch, filters, search]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return undefined;
    if (!filteredMeta?.hasMore) return undefined;
    const hasSearch = Boolean(search?.trim());

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        if (filteredMeta.loading) return;

        dispatch(
          fetchSkills({
            listKey: 'filters',
            append: true,
            params: {
              page: filteredMeta.page + 1,
              page_size: filteredMeta.pageSize,
              ordering: '-createdAt',
              ...(hasSearch ? { search } : {}),
              ...(filters.mode !== 'all' ? { mode: filters.mode } : {}),
              ...(filters.gender !== 'any' ? { gender: filters.gender } : {}),
              ...(filters.subcategoryId.length ? { subcategoryId: filters.subcategoryId } : {}),
              ...(filters.cityIds.length ? { cityIds: filters.cityIds } : {}),
            },
          }),
        );
      },
      { rootMargin: '200px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [dispatch, filteredMeta, filters, search]);

  return (
    <SectionUI
      title={`Подходящие предложения (${filteredSkills.length})`}
      actionButton={
        <ButtonUI variant="tertiary" padding="12px 24px" onClick={() => {}}>
          <SortIcon />
          Сначала новые
        </ButtonUI>
      }
    >
      {filteredMeta?.loading && <p>Загрузка…</p>}
      {filteredMeta?.error && <p>Ошибка: {filteredMeta.error}</p>}

      {filteredSkills.map((skill) => {
        const learnTags = skill.author.learnSubcategories.map((subcat) => ({
          id: subcat.id,
          label: subcat.name,
          bgColor: '#F5F5F5',
        }));

        const age = formatAge(skill.author.birthDate);
        const ageText = age == null ? '' : String(age);

        return (
          <CatalogCardUI
            key={skill.id}
            avatar={mediaUrl(skill.author.avatar)}
            name={skill.author.name}
            ageText={ageText}
            cityName={skill.author.city.name}
            teachTag={{ label: skill.title, bgColor: skill.category.color }}
            learnTags={learnTags}
            likesCount={skill.favoritesCount}
            isFavorited={skill.isFavorited}
            onDetailsClick={() => navigate(`/skills/:${skill.id}`)}
            onFavoriteToggle={(_nextValue: boolean) => {}}
          />
        );
      })}

      {filteredMeta?.hasMore && <div ref={sentinelRef} style={{ height: 1 }} />}
    </SectionUI>
  );
};
