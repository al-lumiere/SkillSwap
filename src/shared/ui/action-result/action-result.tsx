import { FC } from 'react';
import { ButtonUI } from '@ui/button';
import { ActionResultUIProps } from './types';
import styles from './action-result.module.css';

export const ActionResultUI: FC<ActionResultUIProps> = ({ title, description, icon, buttonText, buttonOnClick }) => (
  <div className={styles.actionResult}>
    <div className={styles.icon}>{icon}</div>
    <div className={styles.title}>{title}</div>
    <div className={styles.description}>{description}</div>
    <div className={styles.buttonContainer}>
      <ButtonUI isWide variant="primary" onClick={buttonOnClick}>
        {buttonText}
      </ButtonUI>
    </div>
  </div>
);
