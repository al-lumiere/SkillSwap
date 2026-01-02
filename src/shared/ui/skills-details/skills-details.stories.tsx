import type { Meta, StoryObj } from '@storybook/react-vite';
import { SkillDetailsCard } from './skills-details';

const meta: Meta<typeof SkillDetailsCard> = {
  title: 'UI/SkillDetailsCard',
  component: SkillDetailsCard,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof SkillDetailsCard>;

export const Default: Story = {
  args: {
    title: 'Игра на барабанах',
    category: 'Творчество и искусство / Музыка и звук',
    isOfferSent: false,
    description:
      'Привет! Я играю на барабанах уже больше 10 лет — от репетиций в гараже до выступлений на сцене с живыми группами. Научу основам техники (и как не отбить себе пальцы), играть любимые ритмы и разбирать песни, импровизировать и звучать уверенно даже без паритуры',
    images: [
      'https://picsum.photos/id/1/600/400',
      'https://picsum.photos/id/2/200/200',
      'https://picsum.photos/id/3/200/200',
      'https://picsum.photos/id/4/200/200',
      'https://picsum.photos/id/5/200/200',
      'https://picsum.photos/id/6/200/200',
    ],
  },
};
