import { FC, useState, useMemo } from 'react';
import { InputUI } from '@ui/input';
import { SingleselectUI } from '@components/registration-singleselect';
import { TextAreaUI } from '@ui/text-area';
import { RegistrationSkillUIProps } from './type';
import styles from './registration-skill.module.css';

export const RegistrationSkillUI: FC<RegistrationSkillUIProps> = ({
  localDraft,
  onField,
  onSkillImages,
  categories,
  categoriesStatus,
  skillCategoryId,
  skillSubcategories,
  onSkillCategoryChange,
  errors,
}) => {
  const [isCategoryOpen, setCategoryOpen] = useState(false);
  const [isSubcatOpen, setSubcatOpen] = useState(false);

  const skillCategoryOptions = useMemo(() => categories.map((c) => ({ id: c.id, label: c.name })), [categories]);

  const selectedSkillCategoryId = localDraft.skillCategoryId ? Number(localDraft.skillCategoryId) : null;

  const skillCategoryValue = useMemo(() => {
    if (!selectedSkillCategoryId) return '';
    return categories.find((c) => c.id === selectedSkillCategoryId)?.name ?? '';
  }, [categories, selectedSkillCategoryId]);

  const subcategoryOptions = useMemo(
    () => skillSubcategories.map((sub) => ({ id: sub.id, label: sub.name })),
    [skillSubcategories],
  );

  const selectedSubId = localDraft.skillSubcategoryId ? Number(localDraft.skillSubcategoryId) : null;

  const subcategoryValue = useMemo(() => {
    if (!selectedSubId) return '';
    return skillSubcategories.find((s) => s.id === selectedSubId)?.name ?? '';
  }, [skillSubcategories, selectedSubId]);

  return (
    <div className={styles.wrapper}>
      <InputUI
        label="Название навыка"
        placeholder="Введите название вашего навыка"
        name="register-skill-title"
        value={localDraft.skillTitle ?? ''}
        onChange={onField('skillTitle')}
        errorText={errors?.skillTitle}
        hasError={Boolean(errors?.skillTitle)}
      />

      <SingleselectUI<number>
        isOpen={isCategoryOpen}
        onClose={() => setCategoryOpen(false)}
        handleToggle={() => {
          if (categoriesStatus !== 'succeeded') return;
          setCategoryOpen((v) => !v);
        }}
        placement="bottom-start"
        matchWidth
        offset={-1}
        maxWidth={null}
        label="Категория навыка"
        placeholder="Выберите категорию навыка"
        value={skillCategoryValue}
        options={skillCategoryOptions}
        selectedId={selectedSkillCategoryId}
        onSelect={(id) => {
          onSkillCategoryChange(String(id));
          setCategoryOpen(false);
        }}
        disabled={categoriesStatus !== 'succeeded'}
        errorMessage={errors?.skillCategoryId}
      />

      <SingleselectUI
        isOpen={isSubcatOpen}
        onClose={() => setSubcatOpen(false)}
        handleToggle={() => setSubcatOpen((current) => !current)}
        placement="bottom-end"
        matchWidth
        offset={-1}
        label="Подкатегория навыка"
        placeholder="Выберите подкатегорию навыка"
        value={subcategoryValue}
        selectedId={selectedSubId}
        onSelect={(id: number) => {
          onField('skillSubcategoryId')({
            target: { value: String(id) },
          } as unknown as React.ChangeEvent<HTMLSelectElement>);
          setSubcatOpen(false);
        }}
        options={subcategoryOptions}
        disabled={!skillCategoryId || categoriesStatus !== 'succeeded'}
        errorMessage={errors?.skillSubcategoryId}
      />

      <TextAreaUI
        label="Описание"
        name="bio"
        value={localDraft.skillDescription}
        onChange={onField('skillDescription')}
        rows={4}
        errorText={errors?.skillDescription}
        hasError={Boolean(errors?.skillDescription)}
      />
      
      <div>
        <div className={styles.dragndropWrapper}>
          <label className={`${styles.dragndropField} ${styles.text}`} htmlFor="register-skill-images">
            Перетащите или выберите изображения навыка
            <input id="register-skill-images" type="file" multiple accept="image/*" onChange={onSkillImages} />
          </label>
          <div style={{ display: 'flex', gap: 8 }}>
            {localDraft.skillImages?.map((img: string) => (
              <img key={img} src={img} alt="" style={{ width: 80, height: 80, objectFit: 'cover' }} />
            ))}
          </div>
        </div>
        {errors?.skillImages && <p className={styles.errorText}>{errors.skillImages}</p>}
      </div>
    </div>
  );
};
