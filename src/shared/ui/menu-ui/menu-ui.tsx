import { FC } from 'react';

import { ModalCategoryUI } from '@ui/modal-category-ui';
import styles from './menu-ui.module.css';
import { TMenuUIProps } from './type';

export const MenuUI: FC<TMenuUIProps> = ({ categories }) => (
  <div className={styles.container}>
    {categories.map((category) => (
      <ModalCategoryUI
        key={category.title}
        title={category.title}
        bgColor={category.bgColor}
        icon={category.icon}
        subcategories={category.subcategories}
      />
    ))}
  </div>
);
