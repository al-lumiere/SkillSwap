import React from 'react';
import styles from './stepper.module.css';
import { StepperUIProps } from './type';

export const StepperUI: React.FC<StepperUIProps> = ({ currentStep, totalSteps, onStepClick }) => {
  // Генерируем массив чисел от 1 до totalSteps
  const steps = Array.from({ length: totalSteps }, (_, i) => i + 1);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        Шаг {currentStep} из {totalSteps}
      </h2>

      <div className={styles.stepsWrapper}>
        {steps.map((step) => {
          // Логика из ТЗ:
          // Пройденный шаг (< currentStep) и Текущий (== currentStep) имеют одинаковый стиль.
          // Предстоящий (> currentStep) имеет другой стиль.
          const isActive = step <= currentStep;

          return (
            <button
              key={step}
              type="button"
              className={`${styles.stepButton} ${isActive ? styles.active : ''}`}
              onClick={() => onStepClick?.(step)}
              aria-label={`Перейти к шагу ${step}`}
              aria-current={step === currentStep ? 'step' : undefined}
            />
          );
        })}
      </div>
    </div>
  );
};
