export interface StepperUIProps {
  currentStep: number;
  totalSteps: number;
  onStepClick?: (step: number) => void;
}
