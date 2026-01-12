import { type FC, type ChangeEvent, useState } from 'react';
import { IllustrationBlockUI } from '@ui/illustration-block';
import { AuthPanelUI } from '@components/auth-panel-ui';
import { StepperUI } from '@ui/stepper';
import { InputUI } from '@ui/input';
import LightBulbIllustration from '@images/light-bulb';

import styles from './register.module.css';

/* AuthPanelUI нужно заменить на умный компонент! */

export const RegisterPage: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const args = {
    currentStep: 1,
    totalSteps: 3,
  };

  const [current, setCurrent] = useState(args.currentStep);

  const handleStepClick = (step: number) => {
    setCurrent(step);
  };

  return (
    <div className={styles.wrapper}>
      <StepperUI currentStep={current} totalSteps={args.totalSteps} onStepClick={handleStepClick} />
      <div className={styles.blocks}>
        <div className={styles.block}>
          <AuthPanelUI
            actionText="Далее"
            onAction={() => {}}
            onGoogleClick={() => {}}
            onAppleClick={() => {}}
            errorText=""
            showRegisterLink={false}
          >
            <InputUI
              label="Email"
              name="email"
              type="email"
              placeholder="Введите email"
              value={email}
              onChange={handleEmailChange}
            />
            <InputUI
              label="Пароль"
              name="password"
              type="password"
              placeholder="Введите ваш пароль"
              helperText="Пароль должен содержать не менее 8 знаков"
              value={password}
              onChange={handlePasswordChange}
            />
          </AuthPanelUI>
        </div>
        <div className={styles.block}>
          <IllustrationBlockUI
            illustration={<LightBulbIllustration />}
            title="Добро пожаловать в SkillSwap!"
            description="Присоединяйтесь к SkillSwap и обменивайтесь знаниями и навыками с другими людьми"
          />
        </div>
      </div>
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable arrow-body-style */
import { Gender, RegisterPayload } from '@api/types';
import { registerUserThunk } from '@slices/auth/userSlice';
import { useDispatch, useSelector } from '@store/store';
import { ChangeEvent, useEffect, useMemo, useRef, useState, type FC, type FormEvent } from 'react';
import {
  setStep,
  saveDraft,
  commitStep,
  type Step,
  Step1Account,
  Step2Profile,
  Step3Skill,
} from '@slices/registration/registrationSlice';
import { fetchCities } from '@slices/cities/citiesSlice';
import { fetchCategories } from '@slices/categories/categoriesSlice';
import { compressImageToDataUrl } from '@api/compress';
// import styles from './register.module.css';

type StepData = Step1Account | Step2Profile | Step3Skill;

export const RegisterPage: FC = () => {
  const dispatch = useDispatch();

  const { status, error } = useSelector((s) => s.user);
  const { step, formData, draft } = useSelector((s) => s.registration);
  const cities = useSelector((s) => s.cities.data);
  const citiesStatus = useSelector((s) => s.cities.status);
  const categories = useSelector((s) => s.categories.data);
  const categoriesStatus = useSelector((s) => s.categories.status);

  useEffect(() => {
    if (citiesStatus === 'idle') dispatch(fetchCities());
    if (categoriesStatus === 'idle') dispatch(fetchCategories());
  }, [dispatch, citiesStatus, categoriesStatus]);

  const [localError, setLocalError] = useState<string | null>(null);

  function stepKey(st: Step): 'step1' | 'step2' | 'step3' {
    switch (st) {
      case 1:
        return 'step1';
      case 2:
        return 'step2';
      default:
        return 'step3';
    }
  }

  const stepInitialValues = useMemo(() => {
    return (draft[stepKey(step)] ?? formData[stepKey(step)]) as StepData;
  }, [draft, formData, step]);

  // локальный черновик текущего шага (чтобы не диспатчить на каждое изменение)
  const [localDraft, setLocalDraft] = useState<any>(stepInitialValues);
  const localDraftRef = useRef(localDraft);
  const stepRef = useRef(step);

  useEffect(() => {
    localDraftRef.current = localDraft;
  }, [localDraft]);

  useEffect(() => {
    stepRef.current = step;
  }, [step]);

  // сохраняем локальный draft при размонтировании страницы
  useEffect(() => {
    return () => {
      dispatch(
        saveDraft({
          step: stepRef.current as any,
          data: localDraftRef.current,
        } as any),
      );
    };
  }, [dispatch]);

  // когда меняется step (или данные в сторе), перезаливаем локальный draft
  useEffect(() => {
    setLocalDraft(stepInitialValues);
    setLocalError(null);
  }, [stepInitialValues, step]);

  const isLoading = status === 'loading';

  const onField = (field: string) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { value } = e.target;
    setLocalDraft((prev: any) => ({ ...prev, [field]: value }));
    setLocalError(null);
  };

  // const onAvatarFile = (e: ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (!file) return;
  //   setLocalDraft((prev: any) => ({ ...prev, avatar: file.name }));
  // };

  const onAvatarFile = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const dataUrl = await compressImageToDataUrl({
      file,
      maxWidth: 256,
      maxHeight: 256,
      maxBytes: 120_000, // 120KB бинарно ≈ ~160KB base64
      type: 'image/jpeg',
    });

    setLocalDraft((prev: any) => ({ ...prev, avatar: dataUrl }));
  };

  // const onSkillImages = (e: ChangeEvent<HTMLInputElement>) => {
  //   const files = Array.from(e.target.files ?? []);
  //   const names = files.map((f) => f.name);
  //   setLocalDraft((prev: any) => ({ ...prev, skillImages: names }));
  // };

  const onSkillImages = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []).slice(0, 3); // например не больше 3
    const urls = await Promise.all(
      files.map((file) =>
        compressImageToDataUrl({
          file,
          maxWidth: 1024,
          maxHeight: 1024,
          maxBytes: 200_000,
          type: 'image/jpeg',
        }),
      ),
    );

    setLocalDraft((prev: any) => ({ ...prev, skillImages: urls }));
  };

  // для выпадашек категория/подкатегория
  const learnCategoryId = (localDraft as any).learnCategoryId ?? '';
  const learnCategory = categories.find((c) => String(c.id) === String(learnCategoryId));
  const learnSubcategories = learnCategory?.subcategories ?? [];

  const skillCategoryId = (localDraft as any).skillCategoryId ?? '';
  const skillCategory = categories.find((c) => String(c.id) === String(skillCategoryId));
  const skillSubcategories = skillCategory?.subcategories ?? [];

  // Валидация берёт из localDraft (то, что вводят прямо сейчас)
  const validateStep1 = (): boolean => {
    const { email, password } = localDraft as { email: string; password: string };
    if (!email?.trim()) return (setLocalError('Введите email'), false);
    if (!password?.trim()) return (setLocalError('Введите пароль'), false);
    if (!/\S+@\S+\.\S+/.test(email)) return (setLocalError('Неверный формат email'), false);
    return true;
  };

  const validateStep2 = (): boolean => {
    const v = localDraft as {
      name: string;
      birthDate: string;
      gender: Gender;
      cityId: string;
      learnCategoryId: string;
      learnSubcategoryId: string;
    };
    if (!v.name?.trim()) return (setLocalError('Введите имя'), false);
    if (!v.birthDate?.trim()) return (setLocalError('Укажите дату рождения'), false);
    if (v.gender === 'any') return (setLocalError('Укажите пол'), false);
    if (!v.cityId?.trim()) return (setLocalError('Выберите город'), false);
    // if (!v.learnSubcategoryId?.trim()) return (setLocalError('Выберите направление, которому хотите учиться'), false);
    if (!v.learnCategoryId?.trim()) return (setLocalError('Выберите категорию обучения'), false);
    if (!v.learnSubcategoryId?.trim()) return (setLocalError('Выберите подкатегорию обучения'), false);
    return true;
  };

  const validateStep3 = (): boolean => {
    const v = localDraft as {
      skillTitle: string;
      skillCategoryId: string;
      skillSubcategoryId: string;
      skillDescription: string;
    };
    if (!v.skillTitle?.trim()) return (setLocalError('Введите название навыка'), false);
    if (!v.skillCategoryId?.trim() || !v.skillSubcategoryId?.trim())
      return (setLocalError('Выберите категорию и подкатегорию навыка'), false);
    if (!v.skillDescription?.trim()) return (setLocalError('Добавьте описание навыка'), false);
    return true;
  };

  const handleNext = () => {
    if (step === 1 && !validateStep1()) return;
    if (step === 2 && !validateStep2()) return;

    // фиксируем текущий шаг в formData и очищаем draft этого шага
    dispatch(commitStep({ step: step as any, data: localDraft } as any));
    dispatch(setStep((step + 1) as Step));
  };

  const handleBack = () => {
    // сохраняем локальные правки, раз юзер уходит с шага не нажимая "далее"
    dispatch(saveDraft({ step: step as any, data: localDraft } as any));
    dispatch(setStep((step - 1) as Step));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validateStep3()) return;

    // фиксируем шаг 3 (финальный)
    dispatch(commitStep({ step: 3 as any, data: localDraft } as any));

    const s1 = formData.step1;
    const s2 = formData.step2;
    const s3 = { ...formData.step3, ...localDraft }; // step3 точно актуальный

    const payload: RegisterPayload = {
      email: s1.email.trim(),
      password: s1.password,

      name: s2.name.trim(),
      birthDate: s2.birthDate,
      gender: s2.gender,
      cityId: Number(s2.cityId),
      learnSubcategoryId: Number(s2.learnSubcategoryId),
      avatar: (s2.avatar ?? '').trim(),
      bio: (s2.bio ?? '').trim(),

      skillTitle: s3.skillTitle.trim(),
      skillCategoryId: Number(s3.skillCategoryId),
      skillSubcategoryId: Number(s3.skillSubcategoryId),
      skillDescription: s3.skillDescription.trim(),
      skillImages: s3.skillImages ?? [],
    };

    // todo: вызвать попап с подтверждением, отрисовав в него payload, и только
    // потом, по нажатию на "готово" в попапе, дернуть диспатч регестрации

    dispatch(registerUserThunk(payload));
  };

  return (
    <div>
      <h1>Регистрация</h1>
      <p>Шаг {step} из 3</p>

      {(localError || error) && <div>{localError || error}</div>}

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div>
            <h2>Создаём аккаунт</h2>

            <button type="button" onClick={() => console.info('Google OAuth: заглушка')} disabled={isLoading}>
              Продолжить с Google
            </button>

            <button type="button" onClick={() => console.info('Apple OAuth: заглушка')} disabled={isLoading}>
              Продолжить с Apple
            </button>

            <div>
              <label htmlFor="register-email">
                Email
                <input
                  id="register-email"
                  type="email"
                  value={localDraft.email ?? ''}
                  onChange={onField('email')}
                  autoComplete="email"
                />
              </label>
            </div>

            <div>
              <label htmlFor="register-password">
                Пароль
                <input
                  id="register-password"
                  type="password"
                  value={localDraft.password ?? ''}
                  onChange={onField('password')}
                  autoComplete="new-password"
                />
              </label>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2>О вас</h2>

            <div>
              <label htmlFor="register-avatar">
                Аватар (файл)
                <input id="register-avatar" type="file" accept="image/*" onChange={onAvatarFile} />
              </label>
              {(localDraft as any).avatar && (
                <div>
                  <img
                    src={(localDraft as any).avatar}
                    alt="avatar preview"
                    style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: '50%' }}
                  />
                </div>
              )}
            </div>

            <div>
              <label htmlFor="register-name">
                Имя
                <input id="register-name" type="text" value={localDraft.name ?? ''} onChange={onField('name')} />
              </label>
            </div>

            <div>
              <label htmlFor="register-birthdate">
                Дата рождения
                <input
                  id="register-birthdate"
                  type="date"
                  value={localDraft.birthDate ?? ''}
                  onChange={onField('birthDate')}
                />
              </label>
            </div>

            <div>
              <label htmlFor="register-gender">
                Пол
                <select id="register-gender" value={(localDraft as any).gender ?? 'any'} onChange={onField('gender')}>
                  <option value="any">Любой</option>
                  <option value="male">Мужской</option>
                  <option value="female">Женский</option>
                </select>
              </label>
            </div>

            <div>
              <label htmlFor="register-city">
                Город
                <select
                  id="register-city"
                  value={(localDraft as any).cityId ?? ''}
                  onChange={onField('cityId')}
                  disabled={citiesStatus !== 'succeeded'}
                >
                  <option value="">Не указан</option>
                  {cities.map((c) => (
                    <option key={c.id} value={String(c.id)}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div>
              <label htmlFor="register-learn-category">
                Категория навыка, которому хотите научиться
                <select
                  id="register-learn-category"
                  value={(localDraft as any).learnCategoryId ?? ''}
                  onChange={(e) => {
                    const { value } = e.target;
                    // при смене категории — сбрасываем подкатегорию
                    setLocalDraft((prev: any) => ({
                      ...prev,
                      learnCategoryId: value,
                      learnSubcategoryId: '',
                    }));
                    setLocalError(null);
                  }}
                  disabled={categoriesStatus !== 'succeeded'}
                >
                  <option value="">Выберите категорию</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={String(cat.id)}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div>
              <label htmlFor="register-learn-subcategory">
                Подкатегория навыка, которому хотите научиться
                <select
                  id="register-learn-subcategory"
                  value={(localDraft as any).learnSubcategoryId ?? ''}
                  onChange={onField('learnSubcategoryId')}
                  disabled={!learnCategoryId || categoriesStatus !== 'succeeded'}
                >
                  <option value="">Выберите подкатегорию</option>
                  {learnSubcategories.map((sub) => (
                    <option key={sub.id} value={String(sub.id)}>
                      {sub.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>
        )}

        {step === 3 && (
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
                  value={(localDraft as any).skillCategoryId ?? ''}
                  onChange={(e) => {
                    const { value } = e.target;
                    setLocalDraft((prev: any) => ({
                      ...prev,
                      skillCategoryId: value,
                      skillSubcategoryId: '',
                    }));
                    setLocalError(null);
                  }}
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
                  value={(localDraft as any).skillSubcategoryId ?? ''}
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
                {(localDraft as any).skillImages?.map((img: string) => (
                  <img key={img} src={img} alt="" style={{ width: 80, height: 80, objectFit: 'cover' }} />
                ))}
              </div>
            </div>
          </div>
        )}

        <div>
          {step > 1 && (
            <button type="button" onClick={handleBack} disabled={isLoading}>
              Назад
            </button>
          )}

          {step < 3 && (
            <button type="button" onClick={handleNext} disabled={isLoading}>
              Далее
            </button>
          )}

          {step === 3 && (
            <button type="submit" disabled={isLoading}>
              {isLoading ? 'Регистрируем…' : 'Завершить регистрацию'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
