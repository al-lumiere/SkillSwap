import { FC } from 'react';
import { SectionUI } from '@components/section';
import { useSelector } from 'react-redux';
import { selectSkillsByList } from '@slices/skills/skillsSlice';
import { CatalogCardUI } from '@components/catalog-card';
import { useNavigate } from 'react-router-dom';
import { Skill } from '@api/types';
import { mediaUrl } from '@api/api';
import formatAge from '../../shared/helpers/format-age';

export const RecommendedSkills: FC = () => {
  const recommendedSkills: Skill[] = useSelector(selectSkillsByList('home:recommended'));

  const navigate = useNavigate();

  return (
    <SectionUI title="Рекомендуем">
      {recommendedSkills.map((skill) => {
        const learnTags = skill.author.learnSubcategories.map((subcat) => ({
          id: subcat.id,
          label: subcat.name,
          bgColor: '#F5F5F5', // TODO: добавить цвет в фикстуры
        }));

        return (
          <CatalogCardUI
            key={skill.id}
            avatar={mediaUrl(skill.author.avatar)}
            name={skill.author.name}
            ageText={String(formatAge(skill.author.birthDate)) || ''}
            cityName={skill.author.city.name}
            teachTag={{
              label: skill.title,
              bgColor: skill.category.color,
            }}
            learnTags={learnTags}
            likesCount={skill.favoritesCount}
            isFavorited={skill.isFavorited}
            onDetailsClick={() => {
              navigate(`/skills/:${skill.id}`);
            }}
            onFavoriteToggle={(_nextValue: boolean) => {}}
          />
        );
      })}
    </SectionUI>
  );
};
