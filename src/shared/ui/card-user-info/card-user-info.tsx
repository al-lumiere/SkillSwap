import { FC } from 'react';
import { TextTagUI } from '@ui/text-tag';
import { TCardUserInfoUIProps } from './type';

import styles from './card-user-info.module.css';

export const CardUserInfoUI: FC<TCardUserInfoUIProps> = ({
  avatar,
  name,
  ageText,
  cityName,
  teachTag,
  learnTags,
  bio,
}) => {
  const visibleTags = learnTags.slice(0, 2);
  const hiddenTagsCount = learnTags.length > visibleTags.length ? learnTags.length - visibleTags.length : 0;

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
      </header>

      <p className={styles.bio}>{bio}</p>

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
    </article>
  );
};
