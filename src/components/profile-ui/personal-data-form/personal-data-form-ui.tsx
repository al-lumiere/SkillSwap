/* eslint-disable react/require-default-props */
import { useMemo, useState, type ChangeEvent, type FC } from 'react';
import type { City, Gender } from '@api/types';
import { FieldErrors, FormState } from '@features/profile/personal-data/personal-data';
import { InputUI } from '@ui/input';
import { ButtonUI } from '@ui/button';
import EditIcon from '@icons/pencil-icon';
import { SingleselectUI } from '@components/registration-singleselect';
import { SearchSelectUI } from '@components/registration-search';
import { TextAreaUI } from '@ui/text-area';

import styles from './personal-data-form-ui.module.css';

type Props = {
  values: FormState;
  errors?: FieldErrors;
  cities: City[];
  disabled?: boolean;
  onChangeField: (field: keyof FormState, value: string) => void;
  onSubmit: () => void;
};

export const PersonalDataFormUI: FC<Props> = ({ values, errors, cities, disabled, onChangeField, onSubmit }) => {
  const onField =
    (field: keyof FormState) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      onChangeField(field, e.target.value);
    };

  // gender
  const [isGenderOpen, setIsGenderOpen] = useState(false);

  const genderOptions: { id: Gender; label: string }[] = [
    { id: 'any', label: 'Не указан' },
    { id: 'female', label: 'Женский' },
    { id: 'male', label: 'Мужской' },
  ];

  const genderValue = genderOptions.find((o) => o.id === values.gender)?.label ?? '';

  const onGenderSelect = (id: string) => {
    onChangeField('gender', id);
    setIsGenderOpen(false);
  };

  // city
  const [isCityOpen, setIsCityOpen] = useState(false);
  const [cityQuery, setCityQuery] = useState('');

  const cityValue = useMemo(() => {
    if (!values.cityId) return '';
    const idNum = Number(values.cityId);
    return cities.find((c) => c.id === idNum)?.name ?? '';
  }, [cities, values.cityId]);

  const onCitySelect = (city: City) => {
    onChangeField('cityId', String(city.id));
    setIsCityOpen(false);
    setCityQuery('');
  };

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <InputUI
        label="Почта"
        name="email"
        type="email"
        value={values.email}
        onChange={onField('email')}
        disabled={disabled}
        icon={<EditIcon />}
        errorText={errors?.email}
        hasError={Boolean(errors?.email)}
      />

      <button
        type="button"
        className={styles.changePassword}
        onClick={() => console.info('Change password: todo')}
        disabled={disabled}
      >
        Изменить пароль
      </button>

      <InputUI
        label="Имя"
        name="name"
        value={values.name}
        onChange={onField('name')}
        disabled={disabled}
        icon={<EditIcon />}
        errorText={errors?.name}
        hasError={Boolean(errors?.name)}
      />

      <div className={styles.row2}>
        <InputUI
          label="Дата рождения"
          name="birthDate"
          type="date"
          value={values.birthDate}
          onChange={onField('birthDate')}
          disabled={disabled}
          errorText={errors?.birthDate}
          hasError={Boolean(errors?.birthDate)}
        />

        <div>
          <SingleselectUI
            label="Пол"
            placeholder="Выберите пол"
            value={genderValue}
            options={genderOptions}
            selectedId={values.gender}
            isOpen={isGenderOpen}
            handleToggle={() => setIsGenderOpen((v) => !v)}
            onClose={() => setIsGenderOpen(false)}
            onSelect={onGenderSelect}
            placement="bottom-end"
            offset={-1}
          />
          {errors?.gender && <p className={styles.error}>{errors.gender}</p>}
        </div>
      </div>

      <div>
        <SearchSelectUI
          label="Город"
          placeholder="Начните вводить..."
          value={cityValue}
          options={cities}
          isOpen={isCityOpen}
          handleToggle={() => setIsCityOpen((v) => !v)}
          onClose={() => {
            setIsCityOpen(false);
            setCityQuery('');
          }}
          query={cityQuery}
          handleQueryChange={(q: string) => setCityQuery(q)}
          handleClear={() => setCityQuery('')}
          onSelect={onCitySelect}
          placement="bottom-start"
          offset={-1}
        />

        {errors?.cityId && <p className={styles.error}>{errors.cityId}</p>}
      </div>

      <TextAreaUI
        label="О себе"
        name="bio"
        value={values.bio}
        onChange={onField('bio')}
        disabled={disabled}
        rows={4}
        icon={<EditIcon />}
        errorText={errors?.bio}
        hasError={Boolean(errors?.bio)}
      />

      <div className={styles.actions}>
        <ButtonUI type="submit" disabled={disabled} isWide>
          Сохранить
        </ButtonUI>
      </div>
    </form>
  );
};
