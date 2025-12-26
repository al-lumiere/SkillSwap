import { FC, useState, useEffect } from 'react';
import ChevronRightIcon from '@icons/chevron-right-icon';
import { TSwiperNavigationProps } from './type';
import styles from './swiper-navigation.module.css';

export const SwiperNavigation: FC<TSwiperNavigationProps> = ({ swiper }) => {
  const [isBeginning, setIsBeginning] = useState(swiper?.isBeginning ?? true);
  const [isEnd, setIsEnd] = useState(swiper?.isEnd ?? false);

  useEffect(() => {
    if (!swiper) {
      return undefined;
    }

    const updateState = () => {
      setIsBeginning(swiper.isBeginning);
      setIsEnd(swiper.isEnd);
    };

    updateState();

    swiper.on('slideChange', updateState);
    swiper.on('reachBeginning', updateState);
    swiper.on('reachEnd', updateState);

    return () => {
      swiper.off('slideChange', updateState);
      swiper.off('reachBeginning', updateState);
      swiper.off('reachEnd', updateState);
    };
  }, [swiper]);

  if (!swiper) return null;

  return (
    <div className={styles.navigation}>
      <button
        type="button"
        className={`${styles.button} ${styles.buttonLeft} ${isBeginning ? styles.hidden : ''}`}
        onClick={() => swiper.slidePrev()}
        aria-label="Предыдущий слайд"
      >
        <ChevronRightIcon className={styles.iconLeft} />
      </button>
      <button
        type="button"
        className={`${styles.button} ${styles.buttonRight} ${isEnd ? styles.hidden : ''}`}
        onClick={() => swiper.slideNext()}
        aria-label="Следующий слайд"
      >
        <ChevronRightIcon className={styles.iconRight} />
      </button>
    </div>
  );
};
