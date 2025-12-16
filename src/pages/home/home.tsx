import type { FC } from 'react';
import { ExampleComponentUI } from '@ui/example-component';
import { SkillsListTest } from '../../utils/SkillsListTest';
import styles from './home.module.css';

export const HomePage: FC = () => (
  <>
    <h1>SkillSwap</h1>
    <ExampleComponentUI text="example text" />
    <SkillsListTest />
  </>
);

export default HomePage