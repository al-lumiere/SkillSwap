import { FC, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { SectionUI } from '@components/section';
import { ButtonUI } from '@ui/button';
import { CatalogCardUI } from '@components/catalog-card';

import { useDispatch, useSelector } from '@store/store';
import { fetchSkills, resetList, selectSkillsByList, selectSkillsList } from '@slices/skills/skillsSlice';

import SortIcon from '@icons/sort-icon';
import { Preloader } from '@ui/preloader';
import { Skill } from '@api/types';
import { mediaUrl } from '@api/api';
import formatAge from '../../shared/helpers/format-age';

export const FilteredSkills: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filters = useSelector((s) => s.filters);
  const search = useSelector((s) => s.search.debouncedQuery);

  const selectFilteredSkills = useMemo(() => selectSkillsByList('filters'), []);
  const selectFilteredMeta = useMemo(() => selectSkillsList('filters'), []);

  const filteredSkills: Skill[] = useSelector(selectFilteredSkills);
  const filteredMeta = useSelector(selectFilteredMeta);

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const hasSearch = Boolean(search?.trim());
  const hasGender = filters.gender !== 'any';
  const hasSubcats = filters.subcategoryId.length > 0;
  const hasCities = filters.cityIds.length > 0;
  const hasMode = filters.mode !== 'all';

  const shouldRequest = hasSearch || hasGender || hasSubcats || hasCities || hasMode;

  type FetchSkillsArgs = Parameters<typeof fetchSkills>[0];
  type SkillsParams = FetchSkillsArgs['params'];

  const baseParams = useMemo(
    () => ({
      ordering: '-createdAt' as const,
      ...(hasSearch ? { search: search!.trim() } : {}),
      ...(hasMode ? { mode: filters.mode as 'teach' | 'learn' } : {}),
      ...(hasGender && filters.gender ? { gender: filters.gender } : {}),
      ...(hasSubcats ? { subcategoryId: filters.subcategoryId } : {}),
      ...(hasCities ? { cityIds: filters.cityIds } : {}),
    }),
    [
      hasSearch,
      search,
      hasMode,
      filters.mode,
      hasGender,
      filters.gender,
      hasSubcats,
      filters.subcategoryId,
      hasCities,
      filters.cityIds,
    ],
  );

  useEffect(() => {
    if (!shouldRequest) return;

    dispatch(resetList('filters'));

    const params = {
      page: 1,
      page_size: 18,
      ...baseParams,
    } as unknown as SkillsParams;

    dispatch(fetchSkills({ listKey: 'filters', params }));
  }, [dispatch, shouldRequest, baseParams]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || !filteredMeta.hasMore) {
      return () => {};
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        if (filteredMeta.loading) return;

        const params = {
          page: filteredMeta.page,
          page_size: filteredMeta.pageSize,
          ...baseParams,
        } as unknown as SkillsParams;

        dispatch(fetchSkills({ listKey: 'filters', append: true, params }));
      },
      { rootMargin: '200px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [dispatch, filteredMeta, baseParams]);

  return (
    <SectionUI
      title={`Подходящие предложения (${filteredMeta.total || filteredSkills.length})`}
      actionButton={
        <ButtonUI variant="tertiary" onClick={() => {}}>
          <SortIcon />
          Сначала новые
        </ButtonUI>
      }
    >
      {filteredMeta?.loading && <Preloader />}
      {filteredMeta?.error && <p>Ошибка: {filteredMeta.error}</p>}

      {filteredSkills.map((skill) => {
        const learnTags = skill.author.learnSubcategories.map((subcat) => ({
          id: subcat.id,
          label: subcat.name,
          bgColor: subcat.color || '#F5F5F5',
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
            onDetailsClick={() => navigate(`/skills/${skill.id}`)}
            onFavoriteToggle={() => {}}
          />
        );
      })}

      {filteredMeta?.hasMore && <div ref={sentinelRef} style={{ height: 1 }} />}
    </SectionUI>
  );
};
