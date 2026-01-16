import { FC, useState, useMemo } from 'react';
import { InputUI } from '@ui/input';
import { SingleselectUI } from '@components/registration-singleselect';
import { SearchSelectUI } from '@components/registration-search';
import { SingleselectOption } from '@components/registration-singleselect/type';
import UserCircleIcon from '@icons/user-circle-icon';
import AddIcon from '@icons/add-icon';
import { RegistrationProfileUIProps } from './type';
import styles from './registration-profile.module.css';

export const RegistrationProfileUI: FC<RegistrationProfileUIProps> = ({
  localDraft,
  onAvatarFile,
  onField,
  cities,
  citiesStatus,
  categories,
  categoriesStatus,
  learnCategoryId,
  learnSubcategories,
  onLearnCategoryChange,
  errors,
}) => {
  const [isGenderOpen, setGenderOpen] = useState(false);
  const [isCityOpen, setCityOpen] = useState(false);
  const [isSubcatOpen, setSubcatOpen] = useState(false);
  const [cityQuery, setCityQuery] = useState('');
  const [isLearnCategoryOpen, setIsLearnCategoryOpen] = useState(false);

  const cityValue = useMemo(() => {
    if (!localDraft.cityId) return '';

    const city = cities.find((c) => String(c.id) === String(localDraft.cityId));
    return city?.name ?? '';
  }, [cities, localDraft.cityId]);

  type GenderId = 'any' | 'male' | 'female';

  const genderOptions: SingleselectOption<GenderId>[] = [
    { id: 'any', label: 'Не выбран' },
    { id: 'male', label: 'Мужской' },
    { id: 'female', label: 'Женский' },
  ];

  const learnCategoryOptions = useMemo(() => categories.map((c) => ({ id: c.id, label: c.name })), [categories]);

  const selectedLearnCategoryId = localDraft.learnCategoryId ? Number(localDraft.learnCategoryId) : null;

  const learnCategoryValue = useMemo(() => {
    if (!selectedLearnCategoryId) return '';
    return categories.find((c) => c.id === selectedLearnCategoryId)?.name ?? '';
  }, [categories, selectedLearnCategoryId]);

  const subcategoryOptions = useMemo(
    () => learnSubcategories.map((sub) => ({ id: sub.id, label: sub.name })),
    [learnSubcategories],
  );

  const selectedSubId = localDraft.learnSubcategoryId ? Number(localDraft.learnSubcategoryId) : null;

  const subcategoryValue = useMemo(() => {
    if (!selectedSubId) return '';
    return learnSubcategories.find((s) => s.id === selectedSubId)?.name ?? '';
  }, [learnSubcategories, selectedSubId]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.avatarWrapper}>
        <label htmlFor="register-avatar" className={styles.avatarLabel}>
          <input
            className={styles.avatarInput}
            id="register-avatar"
            type="file"
            accept="image/*"
            onChange={onAvatarFile}
            aria-label="Загрузить аватар"
          />
          <span className={styles.avatarPicture} aria-hidden>
            {localDraft.avatar ? (
              <img className={styles.avatarImg} src={localDraft.avatar} alt="" />
            ) : (
              <UserCircleIcon aria-hidden />
            )}
          </span>
          <span className={styles.avatarPlus} aria-hidden>
            <AddIcon />
          </span>
        </label>
      </div>
      <InputUI
        label="Имя"
        name="register-name"
        value={localDraft.name ?? ''}
        onChange={onField('name')}
        placeholder="Введите ваше имя"
        errorText={errors?.name}
        hasError={Boolean(errors?.name)}
      />
      <div className={styles.doubleContainer}>
        <InputUI
          label="Дата рождения"
          name="birthDate"
          type="date"
          value={localDraft.birthDate}
          onChange={onField('birthDate')}
          errorText={errors?.birthDate}
          hasError={Boolean(errors?.birthDate)}
        />
        <SingleselectUI
          isOpen={isGenderOpen}
          onClose={() => setGenderOpen(false)}
          handleToggle={() => setGenderOpen((current) => !current)}
          placement="bottom-end"
          matchWidth
          offset={-1}
          label="Пол"
          placeholder="Не указан"
          value={genderOptions.find((o) => o.id === (localDraft.gender ?? 'any'))?.label ?? 'Любой'}
          selectedId={localDraft.gender ?? 'any'}
          onSelect={(id: GenderId) => {
            onField('gender')({
              target: { value: id },
            } as unknown as React.ChangeEvent<HTMLSelectElement>);
            setGenderOpen(false);
          }}
          options={genderOptions}
          errorMessage={errors?.gender}
        />
      </div>
      <SearchSelectUI
        label="Город"
        placeholder="Не указан"
        value={cityValue}
        options={cities}
        isOpen={isCityOpen}
        onClose={() => {
          setCityOpen(false);
          setCityQuery('');
        }}
        handleToggle={() => {
          if (citiesStatus !== 'succeeded') return;
          setCityOpen((v) => !v);
        }}
        placement="bottom-start"
        matchWidth
        offset={-1}
        maxWidth={null}
        query={cityQuery}
        handleQueryChange={(value) => setCityQuery(value)}
        handleClear={() => setCityQuery('')}
        onSelect={(city) => {
          onField('cityId')({
            target: { value: String(city.id) },
          } as unknown as React.ChangeEvent<HTMLSelectElement>);
          setCityOpen(false);
          setCityQuery('');
        }}
        errorMessage={errors?.cityId}
      />
      <SingleselectUI<number>
        isOpen={isLearnCategoryOpen}
        onClose={() => setIsLearnCategoryOpen(false)}
        handleToggle={() => {
          if (categoriesStatus !== 'succeeded') return;
          setIsLearnCategoryOpen((v) => !v);
        }}
        placement="bottom-start"
        matchWidth
        offset={-1}
        maxWidth={null}
        label="Категория навыка, которому хотите научиться"
        placeholder="Выберите категорию"
        value={learnCategoryValue}
        options={learnCategoryOptions}
        selectedId={selectedLearnCategoryId}
        onSelect={(id) => {
          onLearnCategoryChange(String(id));
          setIsLearnCategoryOpen(false);
        }}
        disabled={categoriesStatus !== 'succeeded'}
        errorMessage={errors?.learnCategoryId}
      />
      <SingleselectUI
        isOpen={isSubcatOpen}
        onClose={() => setSubcatOpen(false)}
        handleToggle={() => setSubcatOpen((current) => !current)}
        placement="bottom-end"
        matchWidth
        offset={-1}
        label="Подкатегория навыка, которому хотите научиться"
        placeholder="Выберите подкатегорию"
        value={subcategoryValue}
        selectedId={selectedSubId}
        onSelect={(id: number) => {
          onField('learnSubcategoryId')({
            target: { value: String(id) },
          } as unknown as React.ChangeEvent<HTMLSelectElement>);
          setSubcatOpen(false);
        }}
        options={subcategoryOptions}
        disabled={!learnCategoryId || categoriesStatus !== 'succeeded'}
        errorMessage={errors?.learnSubcategoryId}
      />
    </div>
  );
};
