import React from 'react';
import ClockIcon from '@icons/clock-icon';
import styles from './skills-details.module.css';
import { SkillDetailsCardProps } from './types';
import { ButtonUI } from '../button/button'; //
import { CardActionsUI } from '../card-actions/card-actions';
import { GalleryUI } from '../gallery-ui';

export const SkillDetailsCard: React.FC<SkillDetailsCardProps> = ({
  title,
  category,
  description,
  images,
  isFavorite,
  onFavoriteToggle,
  onOfferExchange,
  isOfferSent = false,
}) => {
  const normalizedImages = images.slice(0, 4).map((src) => ({ src, alt: title }));

  const galleryVariant = (() => {
    const count = normalizedImages.length;

    if (count <= 1) return 'single' as const;
    if (count <= 3) return 'slider' as const;
    return 'sliderWithThumbs' as const;
  })();

  return (
    <div className={styles.container}>
      <CardActionsUI
        onShareClick={() => console.log('Share clicked')}
        onMoreClick={() => console.log('More clicked')}
        isFavorite={isFavorite}
        onFavoriteToggle={onFavoriteToggle}
      />

      <div className={styles.content}>
        <div className={styles.infoSide}>
          <div className={styles.titleWrapper}>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.category}>{category}</p>
          </div>

          <div className={styles.description}>{description}</div>
          {isOfferSent ? (
            <ButtonUI
              onClick={onOfferExchange}
              type="button"
              variant="secondary"
              padding="13px 109px"
              iconLeft={<ClockIcon />}
            >
              Обмен предложен
            </ButtonUI>
          ) : (
            <ButtonUI onClick={onOfferExchange} type="button" variant="primary" padding="13px 123px">
              Предложить обмен
            </ButtonUI>
          )}
        </div>

        <div className={styles.gallerySide}>
          <GalleryUI variant={galleryVariant} images={normalizedImages} />
        </div>
      </div>
    </div>
  );
};
