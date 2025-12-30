import { ButtonUI } from '@ui/button';
import { IllustrationBlockUIProps } from './types';
import styles from './illustration-block.module.css';

export const IllustrationBlockUI = ({ illustration, title, description, actions = null }: IllustrationBlockUIProps) => (
  <div className={styles.container}>
    <div className={styles.illustration}>{illustration}</div>
    <div className={styles.content}>
      <div className={styles.text}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
      </div>
      {actions && (
        <div className={styles.buttons}>
          {actions.map((action) => (
            <ButtonUI variant={action.primary ? 'primary' : 'secondary'} onClick={action.onClick} padding="12px 24px">
              {action.text}
            </ButtonUI>
          ))}
        </div>
      )}
    </div>
  </div>
);
