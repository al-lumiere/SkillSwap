import { Suspense } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { HeaderUI } from '@components/header';

export const AuthLayout = () => {
  const navigate = useNavigate();

  return (
    <>
      <HeaderUI variant="compact" onCloseClick={() => navigate(-1)} />
      <main>
        <Suspense fallback="Загружаем...">
          <Outlet />
        </Suspense>
      </main>
    </>
  );
};
