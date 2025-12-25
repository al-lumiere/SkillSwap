import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { StepperUI } from './stepper';

const meta: Meta<typeof StepperUI> = {
  title: 'Shared/UI/StepperUI',
  component: StepperUI,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    currentStep: { control: { type: 'number', min: 1 } },
    totalSteps: { control: { type: 'number', min: 1 } },
  },
};

export default meta;
type Story = StoryObj<typeof StepperUI>;

export const Default: Story = {
  args: {
    currentStep: 1,
    totalSteps: 3,
  },
};

export const Interactive: Story = {
  render: (args) => {
    // Используем useState для управления состоянием внутри стори
    const [current, setCurrent] = useState(args.currentStep);

    const handleStepClick = (step: number) => {
      // Имитация логики валидации
      console.log(`Валидация шага ${current} перед переходом на ${step}`);
      setCurrent(step);
    };

    return <StepperUI currentStep={current} totalSteps={args.totalSteps} onStepClick={handleStepClick} />;
  },
  args: {
    currentStep: 1,
    totalSteps: 3,
  },
};
