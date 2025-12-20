import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { HeaderUI } from '../../widgets/header';

export const MainLayout = () => (
  <>
    <HeaderUI variant="full" isUserAuth={false} />
    {/* <HeaderUI variant="full" isUserAuth userName="Some user" /> */}

    <main>
      <Suspense fallback="Загружаем...">
        <Outlet />
      </Suspense>
    </main>

    {/* TODO: когда появится футер, импортировать его и использовать здесь <AppFooter /> */}
    <h1>Футер</h1>
  </>
);
