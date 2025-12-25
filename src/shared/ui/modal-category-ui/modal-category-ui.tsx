import { FC } from 'react';

import styles from './modal-category-ui.module.css';
import { TModalCategoryUIProps } from './type';

export const ModalCategoryUI: FC<TModalCategoryUIProps> = ({ title, bgColor, icon, subcategories }) => (
  <section className={styles.container} aria-label={title}>
    <div className={styles.icon} style={{ backgroundColor: bgColor }} aria-hidden="true">
      {icon}
    </div>
    <h3 className={styles.title}>{title}</h3>
    <ul className={styles.list}>
      {subcategories.map((subcategory) => (
        <li key={subcategory.id} className={styles.item}>
          {subcategory.name}
        </li>
      ))}
    </ul>
  </section>
);
