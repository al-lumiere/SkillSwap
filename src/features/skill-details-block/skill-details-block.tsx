import type { FC } from 'react';
import { useMemo, useState, useEffect, useCallback } from 'react';

import { mediaUrl } from '@api/api';
import { SkillDetailsCardUI } from '@ui/skills-details';
import { SkillDetailsBlockProps } from './types';

export const SkillDetailsBlock: FC<SkillDetailsBlockProps> = ({ skill }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isOfferSent, setIsOfferSent] = useState(false);

  const serverSkillId = skill.id;
  const serverIsFavorited = skill.isFavorited;

  useEffect(() => {
    setIsFavorite(Boolean(serverIsFavorited));
  }, [serverSkillId, serverIsFavorited]);

  useEffect(() => {
    setIsOfferSent(false);
  }, [serverSkillId]);

  const preparedCategory = useMemo(
    () => [skill.category?.name, skill.subcategory?.name].filter(Boolean).join(' / '),
    [skill.category?.name, skill.subcategory?.name],
  );

  const preparedImages = useMemo(() => {
    if (!skill?.images?.length) return [];
    return skill.images.map(mediaUrl);
  }, [skill.images]);

  const handleFavoriteToggle = useCallback((nextValue?: boolean) => {
    setIsFavorite((prev) => (typeof nextValue === 'boolean' ? nextValue : !prev));
  }, []);

  const handleOfferExchange = useCallback(() => {
    setIsOfferSent((prev) => !prev);
  }, []);

  return (
    <SkillDetailsCardUI
      title={skill.title}
      category={preparedCategory}
      description={skill.description}
      images={preparedImages}
      isFavorite={isFavorite}
      onFavoriteToggle={handleFavoriteToggle}
      onOfferExchange={handleOfferExchange}
      isOfferSent={isOfferSent}
    />
  );
};
