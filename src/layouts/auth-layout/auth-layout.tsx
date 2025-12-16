import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

export const AuthLayout = () => (
  // todo: когда появиться хедер, импортировать его и поюзать
  <>
    {/* <AppHeader variant="auth" /> */}
    <h1>Хедер урезанный</h1>
    <main>
      <Suspense fallback="Загружаем...">
        <Outlet />
      </Suspense>
    </main>
  </>
);
