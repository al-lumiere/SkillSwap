import { FC } from 'react';
import { SectionUI } from '@components/section';
import { ButtonUI } from '@ui/button';
import { useSelector } from 'react-redux';
import { selectSkillsByList, toggleFavorite } from '@slices/skills/skillsSlice';
import { CatalogCardUI } from '@components/catalog-card';
import { useNavigate } from 'react-router-dom';
import ChevronRightIcon from '@icons/chevron-right-icon';
import { Skill } from '@api/types';
import { mediaUrl } from '@api/api';
import { useDispatch } from '@store/store';
import formatAge from '../../shared/helpers/format-age';

export const NewSkills: FC = () => {
  const newSkills: Skill[] = useSelector(selectSkillsByList('home:new'));

  const firstThree: Skill[] = newSkills.slice(0, 3);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  return (
    <SectionUI
      title="Новое"
      actionButton={
        <ButtonUI variant="tertiary" padding="12px 24px" onClick={() => {}}>
          Смотреть все
          <ChevronRightIcon />
        </ButtonUI>
      }
    >
      {firstThree.map((skill) => {
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
            onFavoriteToggle={(nextValue) => dispatch(toggleFavorite({ skillId: skill.id, nextValue }))}
          />
        );
      })}
    </SectionUI>
  );
};
