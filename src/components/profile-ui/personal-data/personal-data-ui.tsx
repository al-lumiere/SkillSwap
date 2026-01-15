/* eslint-disable react/require-default-props */
/* eslint-disable arrow-body-style */
import type { FC } from 'react';
import { FieldErrors, FormState } from '@features/profile/personal-data/personal-data';
import type { City } from '@api/types';
import { PersonalDataFormUI } from '../personal-data-form/personal-data-form-ui';
import { PersonalDataAvatarUI } from '../personal-data-avatar/personal-data-avatar-ui';
import styles from './personal-data-ui.module.css';

export type PersonalDataUIProps = {
  values: FormState;
  errors?: FieldErrors;
  cities: City[];
  disabled?: boolean; // общий disabled на время сохранения
  onChangeField: (field: keyof FormState, value: string) => void;
  onPickAvatar: (file: File) => void;
  onSubmit: () => void;
};

export const PersonalDataUI: FC<PersonalDataUIProps> = ({
  values,
  errors,
  cities,
  disabled,
  onChangeField,
  onPickAvatar,
  onSubmit,
}) => {
  return (
    <div className={styles.layout}>
      <div className={styles.left}>
        <div className={styles.card}>
          <PersonalDataFormUI
            values={values}
            errors={errors}
            cities={cities}
            disabled={disabled}
            onChangeField={onChangeField}
            onSubmit={onSubmit}
          />
        </div>
      </div>

      <div className={styles.right}>
        <div className={styles.avatarCard}>
          <PersonalDataAvatarUI value={values.avatar} disabled={disabled} onPick={onPickAvatar} />
        </div>
      </div>
    </div>
  );
};
