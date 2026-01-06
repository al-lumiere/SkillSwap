import { useEffect, type FC } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '@store/store';
import { fetchSkillById, selectSkillById } from '@slices/skills/skillsSlice';
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

  if (!skill) {
    if (loading) return <p>Загружаем…</p>;
    if (error) return <p>Ошибка: {error}</p>;
    return <p>Навык не найден</p>;
  }

  const categoryId = skill.category.id;

  // return <pre>{JSON.stringify(skill, null, 2)}</pre>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.author}>
        <SkillDetailsBlock skill={skill} />
      </div>
      <SimilarSkillsBlock categoryId={categoryId} excludeSkillId={skill.id} />
    </div>
  );
};

export default SkillPage;
