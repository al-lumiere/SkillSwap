import { FC, useEffect, useState, type ReactElement } from 'react';
import { useDispatch, useSelector } from '@store/store';
import { fetchCategories } from '@slices/categories/categoriesSlice';

import { PopoverUI } from '@ui/popover';
import { ModalCategoryUI } from '@ui/modal-category';
import { NavElementUI } from '@ui/nav-element';

import ChevronDownIcon from '@icons/chevron-down';
import ChevronUpIcon from '@icons/chevron-up';
import GlobalIcon from '@icons/global-icon';
import HomeIcon from '@icons/home-icon';
import LifestyleIcon from '@icons/lifestyle-icon';
import PaletteIcon from '@icons/palette-icon';
import BriefcaseIcon from '@icons/briefcase-icon';
import BookIcon from '@icons/book-icon';
import styles from './all-skills-popover.module.css';

export const AllSkillsPopover: FC = () => {
  const categoryIcon: Record<string, ReactElement> = {
    'business-career': <BriefcaseIcon />,
    languages: <GlobalIcon />,
    'home-comfort': <HomeIcon />,
    'arts-creativity': <PaletteIcon />,
    'education-development': <BookIcon />,
    'health-lifestyle': <LifestyleIcon />,
  };

  const dispatch = useDispatch();

  const { data: categories = [], status } = useSelector((s) => s.categories);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (status === 'idle') dispatch(fetchCategories());
  }, [dispatch, status]);

  const handleToggle = () => setIsOpen((v) => !v);
  const handleClose = () => setIsOpen(false);

  return (
    <PopoverUI
      isOpen={isOpen}
      onClose={handleClose}
      placement="bottom-start"
      offset={8}
      maxWidth={1090}
      anchor={
        <NavElementUI
          text="Все навыки"
          onClick={handleToggle}
          icon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
        />
      }
    >
      <div className={styles.wrapper}>
        <div className={styles.column}>
          {categories.slice(0, 3).map((category) => (
            <ModalCategoryUI
              key={category.id}
              title={category.name}
              bgColor={category.color}
              icon={categoryIcon[category.slug]}
              subcategories={category.subcategories}
            />
          ))}
        </div>
        <div className={styles.column}>
          {categories.slice(3, 6).map((category) => (
            <ModalCategoryUI
              key={category.id}
              title={category.name}
              bgColor={category.color}
              icon={categoryIcon[category.slug]}
              subcategories={category.subcategories}
            />
          ))}
        </div>
      </div>
    </PopoverUI>
  );
};
