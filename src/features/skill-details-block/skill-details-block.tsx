import type { FC } from 'react';
import { useMemo, useState, useEffect, useCallback } from 'react';

import { useDispatch } from '@store/store';
import { toggleFavoriteOptimistic } from '@slices/skills/skillsSlice';
import NotificationIcon from '@icons/notification-icon';
import { SkillDetailsCardUI } from '@ui/skills-details';
import { ActionResultUI } from '@ui/action-result';
import { ModalUI } from '@ui/modal-ui';
import { SkillDetailsBlockProps } from './types';

export const SkillDetailsBlock: FC<SkillDetailsBlockProps> = ({ skill }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isOfferSent, setIsOfferSent] = useState(false);
  const [isExchangeModalOpen, setIsExchangeModalOpen] = useState(false);
  const dispatch = useDispatch();

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

  const handleFavoriteToggle = () => dispatch(toggleFavoriteOptimistic(skill.id));

  const handleOfferExchange = useCallback(() => {
    setIsOfferSent(true);
    setIsExchangeModalOpen(true);
  }, []);

  const handleCloseExchangeModal = useCallback(() => {
    setIsExchangeModalOpen(false);
  }, []);

  return (
    <>
      <SkillDetailsCardUI
        title={skill.title}
        category={preparedCategory}
        description={skill.description}
        isCardActions
        isSkillPage
        images={skill.images}
        isFavorite={isFavorite}
        onFavoriteToggle={handleFavoriteToggle}
        onOfferExchange={handleOfferExchange}
        isOfferSent={isOfferSent}
      />

      {isExchangeModalOpen && (
        <ModalUI onClose={handleCloseExchangeModal}>
          <div style={{ padding: '80px 60px', width: '556px' }}>
            <ActionResultUI
              icon={<NotificationIcon />}
              title="Вы предложили обмен"
              description="Теперь дождитесь подтверждения. Вам придёт уведомление"
              buttonText="Готово"
              buttonLink=""
              buttonOnClick={handleCloseExchangeModal}
            />
          </div>
        </ModalUI>
      )}
    </>
  );
};
