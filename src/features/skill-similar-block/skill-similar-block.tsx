import { FC, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { SectionUI } from '@components/section';
import { CatalogCardUI } from '@components/catalog-card';
import type { Swiper as SwiperType } from 'swiper';
import { SwiperNavigation } from '@ui/swiper-navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Preloader } from '@ui/preloader';

import { useDispatch, useSelector } from '@store/store';

import {
  fetchSkills,
  resetList,
  selectSkillsByList,
  selectSkillsList,
  toggleFavorite,
} from '@slices/skills/skillsSlice';

import { fetchCategories } from '@slices/categories/categoriesSlice';

import { mediaUrl } from '@api/api';
import type { SkillsQueryParams, Skill } from '@api/types';
import { SkillSimilarBlockProps } from './types';
import formatAge from '../../shared/helpers/format-age';

import styles from '../../components/section/section.module.css';
import 'swiper/css';

export const SimilarSkillsBlock: FC<SkillSimilarBlockProps> = ({ categoryId, excludeSkillId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const listKey = `skill:similar:category:${categoryId}`;

  const categories = useSelector((s) => s.categories.data);
  const categoriesStatus = useSelector((s) => s.categories.status);

  const skills: Skill[] = useSelector(selectSkillsByList(listKey));
  const meta = useSelector(selectSkillsList(listKey));

  const subcategoryIds = useMemo(() => {
    const cat = categories.find((c) => c.id === categoryId);
    return cat ? cat.subcategories.map((sc) => sc.id) : [];
  }, [categories, categoryId]);

  useEffect(() => {
    if (categoriesStatus === 'idle') {
      dispatch(fetchCategories());
    }
  }, [dispatch, categoriesStatus]);

  useEffect(() => {
    if (categoriesStatus !== 'succeeded') return;
    if (subcategoryIds.length === 0) return;

    dispatch(resetList(listKey));

    const params: SkillsQueryParams = {
      page: 1,
      page_size: 50,
      subcategoryId: subcategoryIds,
      ordering: '-favoritesCount',
    };

    dispatch(fetchSkills({ listKey, params }));
  }, [dispatch, categoriesStatus, subcategoryIds, listKey]);

  const visible = useMemo(() => skills.filter((s) => s.id !== excludeSkillId), [skills, excludeSkillId]);

  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  const content = (() => {
    if (categoriesStatus === 'loading' || meta.loading) return <Preloader />;
    if (categoriesStatus === 'failed') return <div>Не удалось загрузить категории…</div>;
    if (meta.error) return <div>Не удалось загрузить…</div>;
    if (visible.length === 0) return <div>Похожих предложений пока нет</div>;

    return (
      <>
        <Swiper
          key={excludeSkillId}
          className={styles.swiper}
          spaceBetween={24}
          slidesPerView={4}
          observer
          observeParents
          onSwiper={setSwiperInstance}
        >
          {visible.map((skill) => {
            const learnTags = skill.author.learnSubcategories.map((subcat) => ({
              id: subcat.id,
              label: subcat.name,
              bgColor: '#F5F5F5',
            }));

            return (
              <SwiperSlide key={skill.id}>
                <CatalogCardUI
                  avatar={mediaUrl(skill.author.avatar)}
                  name={skill.author.name}
                  ageText={formatAge(skill.author.birthDate) ?? ''}
                  cityName={skill.author.city.name}
                  teachTag={{ label: skill.title, bgColor: skill.category.color }}
                  learnTags={learnTags}
                  likesCount={skill.favoritesCount}
                  isFavorited={skill.isFavorited}
                  onDetailsClick={() => navigate(`/skills/${skill.id}`)}
                  onFavoriteToggle={(nextValue) => dispatch(toggleFavorite({ skillId: skill.id, nextValue }))}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>

        <SwiperNavigation swiper={swiperInstance} />
      </>
    );
  })();

  return (
    <SectionUI title="Похожие предложения" hasSlider={visible.length > 0}>
      {content}
    </SectionUI>
  );
};
