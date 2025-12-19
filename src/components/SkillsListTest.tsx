/* eslint-disable */
/* prettier-ignore */

// !!! тестовая крокозябра для проверки данных, не часть приложения !!!

import { useState, useEffect, FC } from 'react';
import { fixturesClient, mediaUrl } from '../api/api';
import { Skill } from '../api/types';

function useSkills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fixturesClient
      .getSkills()
      .then(setSkills)
      .catch((e) => setError(e as Error))
      .finally(() => setLoading(false));
  }, []);

  return { skills, loading, error };
}

type Props = {
  skill: Skill;
};

const SkillCard: FC<Props> = ({ skill }) => {
  const { author, category, subcategory, images } = skill;
  const mainImage = images[0];
  const thumbs = images.slice(1, 4);
  const extraCount = images.length - 4;

  return (
    <article
      style={{
        width: '100%',
        borderRadius: '24px',
        background: '#ffffff',
        boxShadow: '0 12px 40px rgba(0,0,0,0.06)',
        padding: '24px 32px',
        boxSizing: 'border-box',
        display: 'flex',
        gap: '32px',
      }}
    >
      <section
        style={{
          flex: '0 0 260px',
          borderRight: '1px solid #E5E5E5',
          paddingRight: '24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '16px',
        }}
      >
        <img
          src={mediaUrl(author.avatar)}
          alt={author.name}
          style={{
            width: '96px',
            height: '96px',
            borderRadius: '50%',
            objectFit: 'cover',
          }}
        />

        <div>
          <div
            style={{
              fontWeight: 600,
              fontSize: '18px',
              marginBottom: '4px',
            }}
          >
            {author.name}
          </div>
          <div
            style={{
              fontSize: '14px',
              color: '#777',
            }}
          >
            {author.city.name}
          </div>
        </div>

        <p
          style={{
            fontSize: '14px',
            color: '#555',
            lineHeight: 1.4,
            margin: 0,
          }}
        >
          {author.bio}
        </p>

        <div style={{ marginTop: '8px' }}>
          <div
            style={{
              fontSize: '14px',
              color: '#777',
              marginBottom: '8px',
            }}
          >
            Может научить:
          </div>
          <span
            style={{
              display: 'inline-block',
              padding: '4px 12px',
              borderRadius: '999px',
              background: '#f2f4ff',
              fontSize: '13px',
            }}
          >
            {skill.title}
          </span>
        </div>

        {author.learnSubcategories?.length > 0 && (
          <div style={{ marginTop: '12px' }}>
            <div
              style={{
                fontSize: '14px',
                color: '#777',
                marginBottom: '8px',
              }}
            >
              Хочет научиться:
            </div>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
              }}
            >
              {author.learnSubcategories.slice(0, 3).map((sub) => (
                <span
                  key={sub.id}
                  style={{
                    padding: '4px 12px',
                    borderRadius: '999px',
                    background: '#f5f5f5',
                    fontSize: '13px',
                  }}
                >
                  {sub.name}
                </span>
              ))}
              {author.learnSubcategories.length > 3 && (
                <span
                  style={{
                    padding: '4px 12px',
                    borderRadius: '999px',
                    background: '#f5f5f5',
                    fontSize: '13px',
                  }}
                >
                  +{author.learnSubcategories.length - 3}
                </span>
              )}
            </div>
          </div>
        )}
      </section>

      <section
        style={{
          flex: '1 1 auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '16px',
        }}
      >
        <header>
          <h2
            style={{
              margin: '0 0 8px',
              fontSize: '24px',
              fontWeight: 600,
            }}
          >
            {skill.title}
          </h2>
          <div
            style={{
              fontSize: '14px',
              color: '#888',
              marginBottom: '16px',
            }}
          >
            {category.name} / {subcategory.name}
          </div>
          <p
            style={{
              fontSize: '14px',
              color: '#555',
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            {skill.description}
          </p>
        </header>

        <button
          type="button"
          style={{
            alignSelf: 'flex-start',
            marginTop: '16px',
            border: 'none',
            borderRadius: '999px',
            padding: '12px 32px',
            background: '#8BC34A',
            color: '#fff',
            fontSize: '15px',
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          Предложить обмен
        </button>
      </section>

      <section
        style={{
          flex: '0 0 280px',
          display: 'flex',
          gap: '12px',
        }}
      >
        <div
          style={{
            flex: '1 1 auto',
            borderRadius: '16px',
            overflow: 'hidden',
          }}
        >
          {mainImage && (
            <img
              src={mediaUrl(mainImage)}
              alt={skill.title}
              style={{
                width: '100%',
                height: '100%',
                maxHeight: '260px',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          )}
        </div>

        {thumbs.length > 0 && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              flex: '0 0 72px',
            }}
          >
            {thumbs.map((img, i) => (
              <div
                key={img + i}
                style={{
                  borderRadius: '12px',
                  overflow: 'hidden',
                  width: '72px',
                  height: '72px',
                  position: 'relative',
                }}
              >
                <img
                  src={mediaUrl(img)}
                  alt={`${skill.title} #${i + 2}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              </div>
            ))}

            {extraCount > 0 && (
              <div
                style={{
                  borderRadius: '12px',
                  overflow: 'hidden',
                  width: '72px',
                  height: '72px',
                  background: '#00000066',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                  fontWeight: 500,
                }}
              >
                +{extraCount}
              </div>
            )}
          </div>
        )}
      </section>
    </article>
  );
};

export const SkillsListTest: FC = () => {
  const { skills, loading, error } = useSkills();

  if (loading) return <div>Загружаем…</div>;
  if (error) return <div>Ошибка: {error.message}</div>;

  return (
    <div
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '24px 16px 40px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}
    >
      <h1>!!! Тестовый компонент для проверки данных !!!</h1>
      {skills.map((skill) => (
        <SkillCard key={skill.id} skill={skill} />
      ))}
    </div>
  );
};
