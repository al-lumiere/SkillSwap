import { FC } from 'react';
import { Filters } from '@features/filters';
import { PopularSkills } from '@features/popular-skills';
import style from './home.module.css';

export const HomePage: FC = () => (
  <div className={style.wrapper}>
    <Filters />
    {/* в этот див нужно положить секции для популярного  и рекоммендуем и накинуть стилей */}
    <div>
      <PopularSkills />
    </div>
  </div>
);
