import { FC } from 'react';
import styles from './section-layout.module.css';
import { TSectionUIProps } from './type';

export const SectionUI: FC<TSectionUIProps> = ({ title, children, actionButton }) => (
  <section className={styles.section}>
    <div className={styles.header}>
      <h2 className={styles.title}>{title}</h2>
      {actionButton}
    </div>
    <div className={styles.cardsContainer}>{children}</div>
  </section>
);
