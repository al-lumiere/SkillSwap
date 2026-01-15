import { FC, useEffect, useRef } from 'react';
import { SectionUI } from '@components/section';
import { useSelector } from 'react-redux';
import {
  fetchSkills,
  selectSkillsByList,
  selectSkillsList,
  toggleFavoriteOptimistic,
} from '@slices/skills/skillsSlice';
import { ButtonUI } from '@ui/button';
import { CatalogCardUI } from '@components/catalog-card';
import { useNavigate } from 'react-router-dom';
import { Skill } from '@api/types';
import { mediaUrl } from '@api/api';
import { useDispatch } from '@store/store';
import formatAge from '../../../shared/helpers/format-age';
import styles from './favorites.module.css';

export const Favorites: FC = () => {
  const favoritedSkills: Skill[] = useSelector(selectSkillsByList('favorites'));
  const favoritedMeta = useSelector(selectSkillsList('favorites'));
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isEmpty = !favoritedMeta.loading && favoritedSkills.length === 0;

  useEffect(() => {
    if (!favoritedMeta?.hasMore) return undefined;
    if (!sentinelRef.current) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        if (favoritedMeta.loading) return;

        dispatch(
          fetchSkills({
            listKey: 'favorites',
            append: true,
            params: {
              page: favoritedMeta.page,
              page_size: favoritedMeta.pageSize,
              onlyFavorites: true,
              ordering: '-createdAt',
            },
          }),
        );
      },
      { rootMargin: '200px' },
    );

    observer.observe(sentinelRef.current);

    return () => observer.disconnect();
  }, [favoritedMeta, dispatch]);

  return (
    <SectionUI title="Избранное">
      {isEmpty && (
        <div className={styles.emptyWrapper}>
          <div className={styles.empty}>
            <p>В избранном пока нет навыков</p>
            <ButtonUI variant="primary" onClick={() => navigate('/')}>
              Перейти к поиску
            </ButtonUI>
          </div>
        </div>
      )}

      {favoritedSkills.map((skill) => {
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
            onFavoriteToggle={() => dispatch(toggleFavoriteOptimistic(skill.id))}
          />
        );
      })}

      {favoritedMeta?.hasMore && <div ref={sentinelRef} style={{ height: 1 }} />}
      {favoritedMeta?.loading && <p>Загрузка…</p>}
    </SectionUI>
  );
};

export default Favorites;
