import { FC } from 'react';
import { RegistrationSkillUIProps } from './type';

export const RegistrationSkillUI: FC<RegistrationSkillUIProps> = ({
  localDraft,
  onField,
  onSkillImages,
  categories,
  categoriesStatus,
  skillCategoryId,
  skillSubcategories,
  onSkillCategoryChange,
}) => (
  <div>
    <h2>Чему вы можете научить</h2>

    <div>
      <label htmlFor="register-skill-title">
        Название навыка
        <input
          id="register-skill-title"
          type="text"
          value={localDraft.skillTitle ?? ''}
          onChange={onField('skillTitle')}
        />
      </label>
    </div>

    <div>
      <label htmlFor="register-skill-category">
        Категория навыка
        <select
          id="register-skill-category"
          value={localDraft.skillCategoryId ?? ''}
          onChange={(e) => onSkillCategoryChange(e.target.value)}
          disabled={categoriesStatus !== 'succeeded'}
        >
          <option value="">Выберите категорию навыка</option>
          {categories.map((cat) => (
            <option key={cat.id} value={String(cat.id)}>
              {cat.name}
            </option>
          ))}
        </select>
      </label>
    </div>

    <div>
      <label htmlFor="register-skill-subcategory">
        Подкатегория навыка
        <select
          id="register-skill-subcategory"
          value={localDraft.skillSubcategoryId ?? ''}
          onChange={onField('skillSubcategoryId')}
          disabled={!skillCategoryId || categoriesStatus !== 'succeeded'}
        >
          <option value="">Выберите подкатегорию навыка</option>
          {skillSubcategories.map((sub) => (
            <option key={sub.id} value={String(sub.id)}>
              {sub.name}
            </option>
          ))}
        </select>
      </label>
    </div>

    <div>
      <label htmlFor="register-skill-description">
        Описание
        <textarea
          id="register-skill-description"
          value={localDraft.skillDescription ?? ''}
          onChange={onField('skillDescription')}
        />
      </label>
    </div>

    <div>
      <label htmlFor="register-skill-images">
        Картинки навыка
        <input id="register-skill-images" type="file" multiple accept="image/*" onChange={onSkillImages} />
      </label>
      <div style={{ display: 'flex', gap: 8 }}>
        {localDraft.skillImages?.map((img: string) => (
          <img key={img} src={img} alt="" style={{ width: 80, height: 80, objectFit: 'cover' }} />
        ))}
      </div>
    </div>
  </div>
);
