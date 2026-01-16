/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable arrow-body-style */
import { Gender, RegisterPayload } from '@api/types';
import { registerUserThunk, acceptRegisteredUser } from '@slices/auth/userSlice';
import { useDispatch, useSelector } from '@store/store';
import { ChangeEvent, useEffect, useMemo, useRef, useState, type FC } from 'react';
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

import { StepperUI } from '@ui/stepper';
import { IllustrationBlockUI } from '@ui/illustration-block';
import UserInfoIllustration from '@images/user-info';
import LightBulb from '@images/light-bulb';
import SchoolBoardIllustration from '@images/school-board';
import { RegistrationAccountUI } from '@features/registration-account';
import { RegistrationProfileUI } from '@features/registration-profile';
import { RegistrationSkillUI } from '@features/registration-skill';
import { ButtonUI } from '@ui/button';
import { ModalUI } from '@ui/modal-ui';
import { ActionResultUI } from '@ui/action-result';
import { SkillDetailsCardUI } from '@ui/skills-details';
import DoneIcon from '@icons/done-icon';
import styles from './register.module.css';

type StepData = Step1Account | Step2Profile | Step3Skill;

export type Step1Errors = Partial<Record<keyof Step1Account, string>>;
export type Step2Errors = Partial<Record<keyof Step2Profile, string>>;
export type Step3Errors = Partial<Record<keyof Step3Skill, string>>;

type StepErrors = Step1Errors | Step2Errors | Step3Errors;

export const RegisterPage: FC = () => {
  const dispatch = useDispatch();

  const { status, error } = useSelector((s) => s.user);
  const { step, formData, draft } = useSelector((s) => s.registration);
  const cities = useSelector((s) => s.cities.data);
  const citiesStatus = useSelector((s) => s.cities.status);
  const categories = useSelector((s) => s.categories.data);
  const categoriesStatus = useSelector((s) => s.categories.status);

  const [stepErrors, setStepErrors] = useState<StepErrors>({});
  const [localError, setLocalError] = useState<string | null>(null);

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [pendingPayload, setPendingPayload] = useState<RegisterPayload | null>(null);

  const didRequestSubmitRef = useRef(false);

  useEffect(() => {
    if (citiesStatus === 'idle') dispatch(fetchCities());
    if (categoriesStatus === 'idle') dispatch(fetchCategories());
  }, [dispatch, citiesStatus, categoriesStatus]);

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
    setStepErrors({});
  }, [stepInitialValues, step]);

  useEffect(() => {
    if (!didRequestSubmitRef.current) return;

    if (status === 'succeeded') {
      didRequestSubmitRef.current = false;
      setIsPreviewOpen(false);
      setIsSuccessOpen(true);
      setPendingPayload(null);
    }

    if (status === 'failed') {
      didRequestSubmitRef.current = false;
    }
  }, [status]);

  const isLoading = status === 'loading';

  const onField = (field: string) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { value } = e.target;
    setLocalDraft((prev: any) => ({ ...prev, [field]: value }));
    setLocalError(null);
    setStepErrors((prev) => {
      if (!(field in prev)) return prev;
      const next = { ...(prev as any) };
      delete (next as any)[field];
      return next;
    });
  };

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

  const onSkillImages = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []).slice(0, 4); // например не больше 3
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
    setLocalError(null);

    setStepErrors((prev) => {
      if (!('skillImages' in prev)) return prev;
      const next = { ...(prev as any) };
      delete next.skillImages;
      return next;
    });
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

    const next: Step1Errors = {};

    if (!email?.trim()) next.email = 'Введите email';
    else if (!/\S+@\S+\.\S+/.test(email)) next.email = 'Неверный формат email';
    if (!password?.trim()) next.password = 'Введите пароль';
    else if (password?.trim().length < 8) next.password = 'Пароль должен содержать не менее 8 символов';

    setStepErrors(next);

    if (Object.keys(next).length) {
      setLocalError('Проверьте поля формы');
      return false;
    }

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

    const next: Step2Errors = {};

    if (!v.name?.trim()) next.name = 'Введите имя';
    if (!v.birthDate?.trim()) next.birthDate = 'Укажите дату рождения';
    if (v.gender === 'any') next.gender = 'Укажите пол';
    if (!String(v.cityId ?? '').trim()) next.cityId = 'Выберите город';
    if (!String(v.learnCategoryId ?? '').trim()) next.learnCategoryId = 'Выберите категорию обучения';
    if (!String(v.learnSubcategoryId ?? '').trim()) next.learnSubcategoryId = 'Выберите подкатегорию обучения';

    setStepErrors(next);

    if (Object.keys(next).length) {
      setLocalError('Проверьте поля формы');
      return false;
    }

    return true;
  };

  const validateStep3 = (): boolean => {
    const v = localDraft as {
      skillTitle: string;
      skillCategoryId: string;
      skillSubcategoryId: string;
      skillDescription: string;
      skillImages: string[];
    };
    const next: Step3Errors = {};

    if (!v.skillTitle?.trim()) next.skillTitle = 'Введите название навыка';
    if (!String(v.skillCategoryId ?? '').trim()) next.skillCategoryId = 'Выберите категорию';
    if (!String(v.skillSubcategoryId ?? '').trim()) next.skillSubcategoryId = 'Выберите подкатегорию';
    if (!v.skillDescription?.trim()) next.skillDescription = 'Добавьте описание навыка';
    if (v.skillImages?.length < 1) next.skillImages = 'Добавьте по меньшей мере одну картинку';

    setStepErrors(next);

    if (Object.keys(next).length) {
      setLocalError('Проверьте поля формы');
      return false;
    }
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

  const buildPayload = (): RegisterPayload => {
    const s1 = formData.step1;
    const s2 = formData.step2;
    const s3 = { ...formData.step3, ...localDraft }; // step3 точно актуальный

    return {
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
  };

  const getSkillCategoryLabel = (p: RegisterPayload) => {
    const cat = categories.find((c: any) => c.id === p.skillCategoryId);
    const sub = cat?.subcategories?.find((s: any) => s.id === p.skillSubcategoryId);

    const catName = (cat as any)?.title ?? (cat as any)?.name ?? '';
    const subName = (sub as any)?.title ?? (sub as any)?.name ?? '';

    return subName ? `${catName} / ${subName}` : catName;
  };

  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (step < 3) {
      handleNext();
      return;
    }

    if (!validateStep3()) return;

    dispatch(commitStep({ step: 3 as any, data: localDraft } as any));

    const payload = buildPayload();
    setPendingPayload(payload);
    setIsPreviewOpen(true);
  };

  const handleConfirmSubmit = async () => {
    if (!pendingPayload) return;

    didRequestSubmitRef.current = true;

    try {
      await dispatch(registerUserThunk(pendingPayload)).unwrap();
      // дальше откроется success-модалка через useEffect(status)
    } catch (e) {
      didRequestSubmitRef.current = false;
    }
  };

  const handleSuccessClose = () => {
    setIsSuccessOpen(false);
    dispatch(acceptRegisteredUser());
  };

  const onLearnCategoryChange = (categoryId: string) => {
    setLocalDraft((prev: any) => {
      const p = prev as Step2Profile;
      return {
        ...p,
        learnCategoryId: categoryId,
        learnSubcategoryId: '',
      };
    });
    setLocalError(null);
    setStepErrors((prev) => {
      if (!('learnCategoryId' in prev) && !('learnSubcategoryId' in prev)) return prev;
      const next = { ...(prev as any) };
      delete next.learnCategoryId;
      delete next.learnSubcategoryId; // логично сбросить и её, т.к. ты обнуляешь подкатегорию
      return next;
    });
  };

  const onSkillCategoryChange = (categoryId: string) => {
    setLocalDraft((prev: any) => ({
      ...prev,
      skillCategoryId: categoryId,
      skillSubcategoryId: '',
    }));

    setLocalError(null);

    setStepErrors((prev) => {
      if (!('skillCategoryId' in prev) && !('skillSubcategoryId' in prev)) return prev;

      const next = { ...(prev as any) };
      delete next.skillCategoryId;
      delete next.skillSubcategoryId;
      return next;
    });
  };

  return (
    <div className={styles.wrapper}>
      <StepperUI currentStep={step} totalSteps={3} />
      <div className={styles.blocks}>
        <form className={styles.form_container} onSubmit={handleFormSubmit}>
          {step === 1 && (
            <RegistrationAccountUI
              isLoading={isLoading}
              localDraft={localDraft as Step1Account}
              onField={onField}
              errors={stepErrors as Step1Errors}
            />
          )}
          {step === 2 && (
            <RegistrationProfileUI
              localDraft={localDraft as Step2Profile}
              onAvatarFile={onAvatarFile}
              onField={onField as any}
              cities={cities}
              citiesStatus={citiesStatus}
              categories={categories}
              categoriesStatus={categoriesStatus}
              learnCategoryId={learnCategoryId}
              learnSubcategories={learnSubcategories}
              onLearnCategoryChange={onLearnCategoryChange}
              errors={stepErrors as Step2Errors}
            />
          )}
          {step === 3 && (
            <RegistrationSkillUI
              localDraft={localDraft as Step3Skill}
              onField={onField}
              onSkillImages={onSkillImages}
              categories={categories}
              categoriesStatus={categoriesStatus}
              skillCategoryId={skillCategoryId}
              skillSubcategories={skillSubcategories}
              onSkillCategoryChange={onSkillCategoryChange}
              errors={stepErrors as Step3Errors}
            />
          )}
          <div className={styles.footer}>
            {step > 1 && (
              <ButtonUI variant="secondary" type="button" onClick={handleBack} disabled={isLoading} isWide>
                Назад
              </ButtonUI>
            )}

            {step < 3 && (
              <ButtonUI type="button" onClick={handleNext} disabled={isLoading} isWide>
                Продолжить
              </ButtonUI>
            )}

            {step === 3 && (
              <ButtonUI type="submit" disabled={isLoading} isWide>
                {isLoading ? 'Регистрируем…' : 'Продолжить'}
              </ButtonUI>
            )}
          </div>
          {(localError || error) && <div className={styles.errorText}>{localError || error}</div>}
        </form>
        <div className={styles.block}>
          {step === 1 && (
            <IllustrationBlockUI
              illustration={<LightBulb />}
              title="Добро пожаловать в SkillSwap!"
              description="Присоединяйтесь к SkillSwap и обменивайтесь знаниями и навыками с другими людьми"
            />
          )}

          {step === 2 && (
            <IllustrationBlockUI
              illustration={<UserInfoIllustration />}
              title="Расскажите немного о себе"
              description="Это поможет другим людям лучше вас узнать, чтобы выбрать для обмена"
            />
          )}

          {step === 3 && (
            <IllustrationBlockUI
              illustration={<SchoolBoardIllustration />}
              title="Укажите, чем вы готовы поделиться"
              description="Так другие люди смогут увидеть ваши предложения и предложить вам обмен!"
            />
          )}
        </div>
      </div>

      {isPreviewOpen && (
        <ModalUI onClose={() => setIsPreviewOpen(false)}>
          {pendingPayload && (
            <div className={styles.modalFirst}>
              <div className={styles.modalHeader}>
                <span className={styles.modalHeaderTitle}>Ваше предложение</span>
                <span className={styles.modalHeaderDesc}>Пожалуйста, проверьте и подтвердите правильность данных</span>
              </div>

              <SkillDetailsCardUI
                title={pendingPayload.skillTitle}
                category={getSkillCategoryLabel(pendingPayload)}
                description={pendingPayload.skillDescription}
                isCardActions={false}
                images={pendingPayload.skillImages}
                isSkillPage={false}
                onChangeClick={() => setIsPreviewOpen(false)}
                onSubmitClick={handleConfirmSubmit}
              />
            </div>
          )}
        </ModalUI>
      )}

      {isSuccessOpen && (
        <ModalUI onClose={handleSuccessClose}>
          <div style={{ padding: '80px 60px', width: '556px' }}>
            <ActionResultUI
              icon={<DoneIcon />}
              title="Ваше предложение создано"
              description="Теперь вы можете предложить обмен"
              buttonText="Готово"
              buttonOnClick={handleSuccessClose}
            />
          </div>
        </ModalUI>
      )}
    </div>
  );
};

export default RegisterPage;
