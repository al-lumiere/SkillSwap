import { FC, useCallback, useEffect, useMemo, useState } from 'react';

import { mediaUrl } from '@api/api';
import { SkillDetailsCardUI } from '@ui/skills-details';
import { useSelector } from '@store/store';
import { selectSkillById } from '@slices/skills/skillsSlice';

type SkillDetailsBlockProps = {
  /** Айди навыка (из url на странице навыка) */
  skillId: number;
};

export const SkillDetailsBlock: FC<SkillDetailsBlockProps> = ({ skillId }) => {
  const skill = useSelector(selectSkillById(skillId));
  const loading = useSelector((s) => s.skills.detailsLoading);
  const error = useSelector((s) => s.skills.detailsError);

  const [isFavorite, setIsFavorite] = useState(() => Boolean(skill?.isFavorited));
  const [isOfferSent, setIsOfferSent] = useState(false);

  // синхронизация локального избранного с "сервером" (стейтом)
  useEffect(() => {
    setIsFavorite(Boolean(skill?.isFavorited));
  }, [skill?.isFavorited]);

  // при смене навыка — сбрасываем локальные состояния для кнопок
  useEffect(() => {
    setIsOfferSent(false);
  }, [skillId]);

  const preparedCategory = useMemo(() => {
    if (!skill) return '';
    return [skill.category?.name, skill.subcategory?.name].filter(Boolean).join(' / ');
  }, [skill]);

  const preparedImages = useMemo(() => {
    if (!skill?.images?.length) return [];
    return skill.images.map(mediaUrl);
  }, [skill]);

  const handleFavoriteToggle = useCallback((nextValue: boolean) => {
    // только визуальный toggle по ТЗ
    setIsFavorite(nextValue);
  }, []);

  const handleOfferExchange = useCallback(() => {
    // только визуальный toggle по ТЗ
    setIsOfferSent((prev) => !prev);
  }, []);

  if (!skill) {
    if (loading) return <p>Загружаем…</p>;
    if (error) return <p>Ошибка: {error}</p>;
    return <p>Навык не найден</p>;
  }

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
