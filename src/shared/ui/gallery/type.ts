import type { ReactNode } from 'react';

export type GalleryVariant = 'single' | 'slider' | 'sliderWithThumbs';

export type GalleryImage = {
  src: string;
  alt?: string;
};

export type GalleryUIProps = {
  variant: GalleryVariant;
  images: GalleryImage[];
  navigationButtons?: ReactNode;
};
