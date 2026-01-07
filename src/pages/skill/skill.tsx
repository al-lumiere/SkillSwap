import { useEffect, useMemo, type FC } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '@store/store';
import { fetchSkillById, selectSkillById } from '@slices/skills/skillsSlice';
import { mediaUrl } from '@api/api';
import { SkillAuthorBlock } from '@features/skill-author-block';
import { SkillDetailsBlock } from '@features/skill-details-block';
import { SimilarSkillsBlock } from '@features/skill-similar-block';
import styles from './skill.module.css';

export const SkillPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const skillId = Number(id);

  const dispatch = useDispatch();

  const skill = useSelector(selectSkillById(skillId));
  const loading = useSelector((s) => s.skills.detailsLoading);
  const error = useSelector((s) => s.skills.detailsError);

  useEffect(() => {
    if (!skillId) return;
    dispatch(fetchSkillById(skillId));
  }, [skillId, dispatch]);

  const preparedSkill = useMemo(() => {
    if (!skill) return null;

    return {
      ...skill,
      images: (skill.images ?? []).map(mediaUrl),
      author: {
        ...skill.author,
        avatar: mediaUrl(skill.author.avatar),
      },
    };
  }, [skill]);

  if (!skill) {
    if (loading) return <p>Загружаем…</p>;
    if (error) return <p>Ошибка: {error}</p>;
    return <p>Навык не найден</p>;
  }

  if (!preparedSkill) return <p>Навык не найден</p>;

  const categoryId = preparedSkill.category.id;

  return (
    <div className={styles.wrapper}>
      <div className={styles.author}>
        <SkillAuthorBlock skill={preparedSkill} />
        <SkillDetailsBlock skill={preparedSkill} />
      </div>
      <SimilarSkillsBlock categoryId={categoryId} excludeSkillId={preparedSkill.id} />
    </div>
  );
};

export default SkillPage;
