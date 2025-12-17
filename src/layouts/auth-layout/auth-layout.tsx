import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { AppHeader } from '../../widgets/header-layout';

export const AuthLayout = () => (
  <>
    <AppHeader variant="auth" onClose={() => window.history.back()} />

    <main>
      <Suspense fallback="Загружаем...">
        <Outlet />
      </Suspense>
    </main>
  </>
);
