import { Suspense } from 'react';
import { HeaderUI } from '@components/header';
import { FooterLayout } from '@components/footer';
import { Outlet } from 'react-router-dom';

export const MainLayout = () => (
  <>
    <HeaderUI variant="full" isUserAuth={false} searchValue="" onSearchChange={() => {}} onSearchClear={() => {}} />
    <main>
      <Suspense fallback="Загружаем...">
        <Outlet />
      </Suspense>
    </main>
    <FooterLayout />
  </>
);
