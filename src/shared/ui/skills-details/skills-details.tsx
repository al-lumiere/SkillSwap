import React from 'react';
import ClockIcon from '@icons/clock-icon';
import PencilIcon from '@icons/pencil-icon';
import styles from './skills-details.module.css';
import { SkillDetailsCardUIProps } from './types';
import { ButtonUI } from '../button/button';
import { CardActionsUI } from '../card-actions/card-actions';
import { GalleryUI } from '../gallery';

export const SkillDetailsCardUI: React.FC<SkillDetailsCardUIProps> = ({
  title,
  category,
  description,
  isCardActions,
  images,
  isFavorite,
  onFavoriteToggle,
  onOfferExchange,
  isOfferSent = false,
  isSkillPage,
  onChangeClick,
  onSubmitClick,
}) => {
  const normalizedImages = images.slice(0, 4).map((src) => ({ src, alt: title }));

  const galleryVariant = (() => {
    const count = normalizedImages.length;

    if (count <= 1) return 'single' as const;
    if (count <= 3) return 'slider' as const;
    return 'sliderWithThumbs' as const;
  })();

  let actions: React.ReactNode = null;

  if (!isSkillPage) {
    actions = (
      <div className={styles.buttonModal}>
        <ButtonUI onClick={onChangeClick} type="button" variant="secondary" isWide iconRight={<PencilIcon />}>
          Редактировать
        </ButtonUI>

        <ButtonUI onClick={onSubmitClick} type="submit" variant="primary" isWide>
          Готово
        </ButtonUI>
      </div>
    );
  } else if (isOfferSent) {
    actions = (
      <ButtonUI onClick={onOfferExchange} type="button" variant="secondary" isWide iconLeft={<ClockIcon />}>
        Обмен предложен
      </ButtonUI>
    );
  } else {
    actions = (
      <ButtonUI onClick={onOfferExchange} type="button" variant="primary" isWide>
        Предложить обмен
      </ButtonUI>
    );
  }

  return (
    <div className={styles.container}>
      {isCardActions && (
        <div className={styles.actions}>
          <CardActionsUI
            onShareClick={() => console.log('Share clicked')}
            onMoreClick={() => console.log('More clicked')}
            isFavorite={isFavorite}
            onFavoriteToggle={onFavoriteToggle}
          />
        </div>
      )}

      <div className={styles.content}>
        <div className={styles.infoSide}>
          <div className={styles.infoDetails}>
            <div className={styles.titleWrapper}>
              <h1 className={styles.title}>{title}</h1>
              <p className={styles.category}>{category}</p>
            </div>

            <div className={styles.description}>{description}</div>
          </div>

          {actions}
        </div>

        <div className={styles.gallerySide}>
          <GalleryUI variant={galleryVariant} images={normalizedImages} />
        </div>
      </div>
    </div>
  );
};
