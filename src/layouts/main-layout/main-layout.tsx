import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

export const MainLayout = () => (
  // todo: когда появяться хедер с футером, импортировать их и поюзать
  <>
    {/* <AppHeader variant="full" /> */}
    <h1>Хедер</h1>
    <main>
      <Suspense fallback="Загружаем...">
        <Outlet />
      </Suspense>
    </main>
    {/* <AppFooter /> */}
    <h1>Футер</h1>
  </>
);
