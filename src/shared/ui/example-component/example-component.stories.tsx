import type { Meta, StoryObj } from '@storybook/react-vite';
import { ExampleComponentUI } from './example-component';

// описание компонента для сторибука, в дженерик нужно передать типы пропсов компонента
// можно также указать parameters, argTypes
const meta: Meta<typeof ExampleComponentUI> = {
  title: 'shared/ui/Logo',
  component: ExampleComponentUI,
  args: {
    text: 'Example text you can change it',
  },
  argTypes: {
    text: { control: 'text' },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof ExampleComponentUI>;

// дефолтное состояние компонента
export const Default: Story = {};

// вариации компонента
export const CustomText: Story = {
  args: {
    text: 'Yet another example for tutorial purposes',
  },
};
