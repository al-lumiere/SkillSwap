import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { HeaderUI } from '../../widgets/header';

export const AuthLayout = () => (
  <>
    <HeaderUI variant="compact" onCloseClick={() => window.history.back()} />
    <main>
      <Suspense fallback="Загружаем...">
        <Outlet />
      </Suspense>
    </main>
  </>
);
