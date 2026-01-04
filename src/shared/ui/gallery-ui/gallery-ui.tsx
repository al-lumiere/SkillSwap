import type { FC, ReactElement } from 'react';
import { isValidElement, cloneElement, useMemo, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { SwiperNavigation } from '@ui/swiper-navigation';
import type { GalleryUIProps } from './type';
import styles from './gallery-ui.module.css';

import 'swiper/css';

export const GalleryUI: FC<GalleryUIProps> = ({ variant, images, navigationButtons }) => {
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const normalizedImages = useMemo(() => images.filter((img) => Boolean(img.src)), [images]);

  if (normalizedImages.length === 0) return null;

  const shouldUseSwiper = variant !== 'single' && normalizedImages.length > 1;
  const shouldRenderThumbs = variant === 'sliderWithThumbs' && normalizedImages.length >= 4;

  const renderNavigation = () => {
    if (!shouldUseSwiper) return null;

    if (navigationButtons && isValidElement(navigationButtons)) {
      return cloneElement(navigationButtons as ReactElement, { swiper });
    }

    return <SwiperNavigation swiper={swiper} />;
  };

  return (
    <div className={styles.container}>
      <div className={styles.main}>
        {shouldUseSwiper ? (
          <div className={styles.slider}>
            <Swiper
              className={styles.swiper}
              slidesPerView={1}
              spaceBetween={0}
              observer
              observeParents
              onSwiper={setSwiper}
              onSlideChange={(nextSwiper) => setActiveIndex(nextSwiper.activeIndex)}
            >
              {normalizedImages.map(({ src, alt }) => (
                <SwiperSlide key={src} className={styles.slide}>
                  <img className={styles.mainMedia} src={src} alt={alt ?? ''} />
                </SwiperSlide>
              ))}
            </Swiper>

            {renderNavigation()}
          </div>
        ) : (
          <img className={styles.mainMedia} src={normalizedImages[0].src} alt={normalizedImages[0].alt ?? ''} />
        )}
      </div>

      {shouldRenderThumbs && (
        <div className={styles.thumbs}>
          {normalizedImages.slice(1, 4).map(({ src, alt }, index) => {
            const realIndex = index + 1;
            const isActive = activeIndex === realIndex;

            return (
              <button
                key={src}
                type="button"
                className={styles.thumbButton}
                onClick={() => swiper?.slideTo(realIndex)}
                aria-label={`Показать изображение ${realIndex + 1}`}
                aria-current={isActive}
              >
                <img className={styles.thumbImage} src={src} alt={alt ?? ''} />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
