/* eslint-disable react/require-default-props */
import { ChangeEvent, FC } from 'react';
import GelleryEditIcon from '@icons/gallery-edit-icon';
import styles from './personal-data-avatar-ui.module.css';

type Props = {
  value: string;
  disabled?: boolean;
  onPick: (file: File) => void;
};

export const PersonalDataAvatarUI: FC<Props> = ({ value, disabled, onPick }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) onPick(file);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.avatarWrapper}>
        <div className={styles.avatar}>
          {value ? <img src={value} alt="Аватар" /> : <div className={styles.placeholder}>Нет фото</div>}
        </div>

        <label htmlFor="image" className={styles.editButton}>
          <GelleryEditIcon />
          <input id="image" type="file" accept="image/*" disabled={disabled} onChange={handleChange} />
        </label>
      </div>
    </div>
  );
};
