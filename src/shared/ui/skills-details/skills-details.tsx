import React, { useState } from 'react';
import styles from './skills-details.module.css';
import { SkillDetailsCardProps } from './types';
import { ButtonUI } from '../button/button'; //
import { CardActionsUI } from '../card-actions/card-actions';

export const SkillDetailsCard: React.FC<SkillDetailsCardProps> = ({
  title,
  category,
  description,
  images,
  onOfferExchange,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const MAX_THUMBNAILS = 3;
  const mainImage = images[activeImageIndex];
  const thumbnails = images.slice(1, 1 + MAX_THUMBNAILS);
  const remainingCount = images.length - (MAX_THUMBNAILS + 1);

  // Обработчик для клавиатуры (Enter / Space)
  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setActiveImageIndex(index);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.actionsWrapper}>
        <CardActionsUI
          onShareClick={() => console.log('Share clicked')}
          onMoreClick={() => console.log('More clicked')}
          // Если нужно состояние лайка:
          isFavorite={false}
          onFavoriteToggle={(val) => console.log('Favorite:', val)}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.infoSide}>
          <div className={styles.titleWrapper}>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.category}>{category}</p>
          </div>

          <div className={styles.description}>{description}</div>

          <div className={styles.buttonPadding}>
            <ButtonUI onClick={onOfferExchange} type="button" variant="primary" padding="12px 123px">
              Предложить обмен
            </ButtonUI>
          </div>
        </div>

        <div className={styles.gallerySide}>
          <div className={styles.mainImageWrapper}>
            <img src={mainImage} alt={title} className={styles.mainImage} />

            {images.length > 1 && (
              <div className={styles.navArrows}>
                <button
                  type="button"
                  onClick={() => setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
                  aria-label="Предыдущее фото"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={() => setActiveImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
                  aria-label="Следующее фото"
                >
                  ›
                </button>
              </div>
            )}
          </div>

          <div className={styles.thumbnailsColumn}>
            {thumbnails.map((src, index) => {
              const realIndex = index + 1;
              const isLastThumbnail = index === MAX_THUMBNAILS - 1;
              const hasMore = isLastThumbnail && remainingCount > 0;

              return (
                <button
                  key={src} // Лучше использовать src или id, если они уникальны
                  type="button"
                  className={styles.thumbItem}
                  onClick={() => setActiveImageIndex(realIndex)}
                  onKeyDown={(e) => handleKeyDown(e, realIndex)} // Исправлено: поддержка клавиатуры
                  aria-label={`Показать фото ${realIndex + 1}`}
                >
                  <img src={src} alt="" aria-hidden="true" />
                  {hasMore && <div className={styles.overlay}>+{remainingCount}</div>}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
