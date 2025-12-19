import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { AppHeader } from '../../widgets/header-layout';

export const MainLayout = () => (
  <>
    <AppHeader isAuthenticated={false} />
    {/* Для теста авторизованного пользователя и кнопки "закрыть" раскомитить нижние строчки */}
    <AppHeader isAuthenticated />
    {/* <AppHeader variant="auth" onClose={() => window.history.back()} /> */}

    <main>
      <Suspense fallback="Загружаем...">
        <Outlet />
      </Suspense>
    </main>

    {/* TODO: когда появится футер, импортировать его и использовать здесь <AppFooter /> */}
    <h1>Футер</h1>
  </>
);
