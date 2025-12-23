import { FC } from 'react';
import { IconButtonUI } from '@ui/icon-button';
import { TextTagUI } from '@ui/text-tag';
import { ButtonUI } from '@ui/button';
import LikeIcon from '@icons/like-icon';
import LikeFullIcon from '@icons/like-full-icon';
import { TCatalogCardUIProps } from './type';

import styles from './catalog-card.module.css';

export const CatalogCardUI: FC<TCatalogCardUIProps> = ({
  avatar,
  name,
  ageText,
  cityName,
  teachTag,
  learnTags,
  likesCount,
  isFavorited,
  onDetailsClick,
  onFavoriteToggle,
}) => {
  const visibleTags = learnTags.slice(0, 2);
  const hiddenTagsCount = learnTags.length > visibleTags.length ? learnTags.length - visibleTags.length : 0;

  const handleFavorite = () => {
    onFavoriteToggle?.(!isFavorited);
  };

  const handleDetailsClick = () => {
    onDetailsClick?.();
  };

  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <img className={styles.avatar} src={avatar} alt={name} />
        <div className={styles.userInfo}>
          <p className={styles.name}>{name}</p>
          <p className={styles.meta}>
            {cityName}
            {ageText ? `, ${ageText}` : ''}
          </p>
        </div>
        <div className={styles.favorite}>
          <span className={styles.likes}>{likesCount}</span>
          <IconButtonUI
            aria-label={isFavorited ? 'Убрать из избранного' : 'Добавить в избранное'}
            isActive={isFavorited}
            onClick={handleFavorite}
          >
            {isFavorited ? <LikeFullIcon /> : <LikeIcon />}
          </IconButtonUI>
        </div>
      </header>

      <div className={styles.tagsSection}>
        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Может научить:</h3>
          <div className={styles.tagsRow}>
            <TextTagUI label={teachTag.label} bgColor={teachTag.bgColor} />
          </div>
        </section>

        <section className={styles.section}>
          <h3 className={styles.sectionTitle}>Хочет научиться:</h3>
          <div className={styles.tagsRow}>
            {visibleTags.map((tag) => (
              <TextTagUI key={tag.id} label={tag.label} bgColor={tag.bgColor} />
            ))}

            {hiddenTagsCount > 0 && <TextTagUI label={`+${hiddenTagsCount}`} bgColor="#E8ECF7" />}
          </div>
        </section>
      </div>

      <ButtonUI variant="primary" onClick={handleDetailsClick} padding="12px 99px">
        Подробнее
      </ButtonUI>
    </article>
  );
};
