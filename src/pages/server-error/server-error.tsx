import type { FC } from 'react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { IllustrationBlockUI } from '@ui/illustration-block';
import Error500Illustration from '@images/error-500';

import styles from './server-error.module.css';

export const ServerErrorPage: FC = () => {
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
          illustration={<Error500Illustration />}
          title="На сервере произошла ошибка"
          description="Попробуйте позже или вернитесь на главную страницу"
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

export default ServerErrorPage;
