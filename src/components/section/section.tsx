import { FC } from 'react';
import styles from './section.module.css';
import { TSectionUIProps } from './type';

export const SectionUI: FC<TSectionUIProps> = ({ title, children, actionButton, hasSlider = false }) => (
  <section className={styles.section}>
    <div className={styles.header}>
      <h2 className={styles.title}>{title}</h2>
      {actionButton}
    </div>
    {hasSlider ? (
      <div className={styles.sliderContainer}>{children}</div>
    ) : (
      <div className={styles.cardsContainer}>{children}</div>
    )}
  </section>
);
