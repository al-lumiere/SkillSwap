import type { FC } from 'react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { IllustrationBlockUI } from '@ui/illustration-block';
import Error404Illustration from '@images/error-404';

import styles from './not-found.module.css';

export const NotFoundPage: FC = () => {
  const navigate = useNavigate();

  const handleGoHome = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const handleReportError = useCallback(() => {
    // тут заглушка
    console.log('Сообщить об ошибке');
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <IllustrationBlockUI
          illustration={<Error404Illustration />}
          title="Страница не найдена"
          description="К сожалению, эта страница недоступна. Вернитесь на главную страницу или попробуйте позже"
          actions={[
            {
              text: 'Сообщить об ошибке',
              onClick: handleReportError,
            },
            {
              primary: true,
              text: 'На главную',
              onClick: handleGoHome,
            },
          ]}
        />
      </div>
    </div>
  );
};

export default NotFoundPage;
