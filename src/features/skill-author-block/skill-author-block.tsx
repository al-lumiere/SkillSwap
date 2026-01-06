import type { FC } from 'react';
import { useMemo } from 'react';

import { CardUserInfoUI } from '@ui/card-user-info';
import type { SkillAuthorBlockProps } from './types';
import formatAge from '../../shared/helpers/format-age';

export const SkillAuthorBlock: FC<SkillAuthorBlockProps> = ({ skill }) => {
  const { author } = skill;

  const ageText = useMemo(() => formatAge(author.birthDate) ?? '', [author.birthDate]);

  const teachTag = useMemo(
    () => ({
      label: skill.title,
      bgColor: skill.category?.color || '#F5F5F5',
    }),
    [skill.title, skill.category?.color],
  );

  const learnTags = useMemo(
    () =>
      author.learnSubcategories.map((subcat) => ({
        id: subcat.id,
        label: subcat.name,
        bgColor: subcat.color || '#F5F5F5',
      })),
    [author.learnSubcategories],
  );

  return (
    <CardUserInfoUI
      avatar={author.avatar}
      name={author.name}
      bio={author.bio}
      ageText={ageText}
      cityName={author.city.name}
      teachTag={teachTag}
      learnTags={learnTags}
    />
  );
};
