import { FC, useEffect, useRef } from 'react';
import { SectionUI } from '@components/section';
import { useSelector } from 'react-redux';
import { fetchSkills, selectSkillsByList, selectSkillsList, toggleFavorite } from '@slices/skills/skillsSlice';
import { CatalogCardUI } from '@components/catalog-card';
import { useNavigate } from 'react-router-dom';
import { Skill } from '@api/types';
import { mediaUrl } from '@api/api';
import { useDispatch } from '@store/store';
import { Preloader } from '@ui/preloader';
import formatAge from '../../shared/helpers/format-age';

export const RecommendedSkills: FC = () => {
  const recommendedSkills: Skill[] = useSelector(selectSkillsByList('home:recommended'));
  const recomendedMeta = useSelector(selectSkillsList('home:recommended'));
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!recomendedMeta?.hasMore) return undefined;
    if (!sentinelRef.current) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        if (recomendedMeta.loading) return;

        dispatch(
          fetchSkills({
            listKey: 'home:recommended',
            append: true,
            params: {
              page: recomendedMeta.page,
              page_size: recomendedMeta.pageSize,
            },
          }),
        );
      },
      { rootMargin: '200px' },
    );

    observer.observe(sentinelRef.current);

    return () => observer.disconnect();
  }, [recomendedMeta, dispatch]);

  return (
    <SectionUI title="Рекомендуем">
      {recommendedSkills.map((skill) => {
        const learnTags = skill.author.learnSubcategories.map((subcat) => ({
          id: subcat.id,
          label: subcat.name,
          bgColor: subcat.color || '#F5F5F5',
        }));

        return (
          <CatalogCardUI
            key={skill.id}
            avatar={mediaUrl(skill.author.avatar)}
            name={skill.author.name}
            ageText={formatAge(skill.author.birthDate) ?? ''}
            cityName={skill.author.city.name}
            teachTag={{
              label: skill.title,
              bgColor: skill.category.color,
            }}
            learnTags={learnTags}
            likesCount={skill.favoritesCount}
            isFavorited={skill.isFavorited}
            onDetailsClick={() => {
              navigate(`/skills/${skill.id}`);
            }}
            onFavoriteToggle={(nextValue) => dispatch(toggleFavorite({ skillId: skill.id, nextValue }))}
          />
        );
      })}

      {recomendedMeta?.hasMore && <div ref={sentinelRef} style={{ height: 1 }} />}
      {recomendedMeta?.loading && <Preloader />}
    </SectionUI>
  );
};
