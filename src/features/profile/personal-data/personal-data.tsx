/* eslint-disable arrow-body-style */
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '@store/store';
import { Gender } from '@api/types';
import { fetchCities } from '@slices/cities/citiesSlice';
import { compressImageToDataUrl } from '@api/compress';
import { updateProfileThunk } from '@slices/auth/userSlice';
import { Preloader } from '@ui/preloader';
import { PersonalDataUI } from '@components/profile-ui/personal-data';

export type FormState = {
  email: string;
  avatar: string;
  name: string;
  birthDate: string;
  gender: Gender;
  cityId: string;
  bio: string;
};

export type FieldErrors = Partial<Record<keyof FormState, string>>;

export const PersonalData: FC = () => {
  const { currentUser, status } = useSelector((s) => s.user);
  const dispatch = useDispatch();
  const cities = useSelector((s) => s.cities.data);
  const citiesStatus = useSelector((s) => s.cities.status);

  const isLoading = status === 'loading';

  useEffect(() => {
    if (citiesStatus === 'idle') dispatch(fetchCities());
  }, [dispatch, citiesStatus]);

  const [form, setForm] = useState<FormState>({
    email: '',
    avatar: '',
    name: '',
    birthDate: '',
    gender: 'any',
    cityId: '',
    bio: '',
  });
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [localError, setLocalError] = useState<string | null>(null);
  const [savedMsg, setSavedMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!currentUser) return;

    setForm({
      email: currentUser.email ?? '',
      avatar: currentUser.avatar ?? '',
      name: currentUser.name ?? '',
      birthDate: currentUser.birthDate ?? '',
      gender: (currentUser.gender ?? 'any') as Gender,
      cityId: currentUser.city?.id ? String(currentUser.city.id) : '',
      bio: currentUser.bio ?? '',
    });

    setFieldErrors({});
    setLocalError(null);
    setSavedMsg(null);
  }, [currentUser]);

  const onChangeField = (key: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));

    setFieldErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });

    setLocalError(null);
    setSavedMsg(null);
  };

  const onPickAvatar = async (file: File) => {
    if (!file) return;

    try {
      const dataUrl = await compressImageToDataUrl({
        file,
        maxWidth: 256,
        maxHeight: 256,
        maxBytes: 120_000,
        type: 'image/jpeg',
      });

      setForm((prev) => ({ ...prev, avatar: dataUrl }));
      setLocalError(null);
      setSavedMsg(null);
    } catch (err) {
      setLocalError(err instanceof Error ? err.message : 'Не удалось обработать изображение');
    }
  };

  const validate = (): boolean => {
    const nextErrors: FieldErrors = {};

    if (!/\S+@\S+\.\S+/.test(form.email)) nextErrors.email = 'Неверный формат email';
    if (!form.name.trim()) nextErrors.name = 'Введите имя';
    if (!form.birthDate.trim()) nextErrors.birthDate = 'Укажите дату рождения';
    if (form.gender === 'any') nextErrors.gender = 'Укажите пол';
    if (!form.cityId) nextErrors.cityId = 'Выберите город';
    if (!form.bio.trim()) nextErrors.bio = 'Укажите информацию "о себе"';

    setFieldErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      setLocalError('Проверьте поля формы');
      return false;
    }

    return true;
  };

  const onSubmit = () => {
    if (!currentUser) return;
    if (!validate()) return;

    // PATCH — отправляем только нужные поля
    dispatch(
      updateProfileThunk({
        email: form.email.trim(),
        avatar: form.avatar.trim(),
        name: form.name.trim(),
        birthDate: form.birthDate,
        gender: form.gender,
        cityId: Number(form.cityId),
        bio: form.bio.trim(),
      }),
    )
      .unwrap?.()
      .then(() => setSavedMsg('Сохранено'))
      .catch(() => {
        setSavedMsg(null);
      });
  };

  if (!currentUser) return <div>Нужно войти</div>;

  return (
    <section>
      {isLoading && <Preloader variant="overlay" />}
      <PersonalDataUI
        values={form}
        errors={fieldErrors}
        cities={cities}
        disabled={isLoading}
        onChangeField={onChangeField}
        onPickAvatar={onPickAvatar}
        onSubmit={onSubmit}
      />
      {(localError || savedMsg) && (
        <div>
          {localError && <p style={{ color: 'crimson' }}>{localError}</p>}
          {savedMsg && <p style={{ color: 'green' }}>{savedMsg}</p>}
        </div>
      )}
    </section>
  );
};

export default PersonalData;
