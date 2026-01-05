import type { Meta, StoryObj } from '@storybook/react-vite';
import { GalleryUI } from './gallery';

const meta: Meta<typeof GalleryUI> = {
  title: 'UI/GalleryUI',
  component: GalleryUI,
};

export default meta;

type Story = StoryObj<typeof GalleryUI>;

const images1 = [{ src: 'https://placehold.co/800x800', alt: '1' }];

const images2 = [
  { src: 'https://placehold.co/800x800?text=1', alt: '1' },
  { src: 'https://placehold.co/800x800?text=2', alt: '2' },
];

const images3 = [
  { src: 'https://placehold.co/800x800?text=1', alt: '1' },
  { src: 'https://placehold.co/800x800?text=2', alt: '2' },
  { src: 'https://placehold.co/800x800?text=3', alt: '3' },
];

const images4 = [
  { src: 'https://placehold.co/800x800?text=1', alt: '1' },
  { src: 'https://placehold.co/800x800?text=2', alt: '2' },
  { src: 'https://placehold.co/800x800?text=3', alt: '3' },
  { src: 'https://placehold.co/800x800?text=4', alt: '4' },
];

export const Single: Story = {
  args: {
    variant: 'single',
    images: images1,
  },
};

export const Slider: Story = {
  args: {
    variant: 'slider',
    images: images3,
  },
};

export const SliderWithThumbs: Story = {
  args: {
    variant: 'sliderWithThumbs',
    images: images4,
  },
};

export const Responsive: Story = {
  args: {
    variant: 'slider',
    images: images2,
  },
  render: (args) => (
    <div style={{ display: 'grid', gap: 24 }}>
      <div style={{ width: 260 }}>
        <GalleryUI variant={args.variant} images={args.images} navigationButtons={args.navigationButtons} />
      </div>

      <div style={{ width: 440 }}>
        <GalleryUI variant={args.variant} images={args.images} navigationButtons={args.navigationButtons} />
      </div>

      <div style={{ width: 620 }}>
        <GalleryUI variant={args.variant} images={args.images} navigationButtons={args.navigationButtons} />
      </div>
    </div>
  ),
};
