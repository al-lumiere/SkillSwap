import { FC } from 'react';
import { TExampleComponentProps } from './type';
import styles from './example-component.module.css';

export const ExampleComponentUI: FC<TExampleComponentProps> = ({ text }) => (
  <div className={styles.container}>
    <p className={styles.text}>{text}</p>
  </div>
);
