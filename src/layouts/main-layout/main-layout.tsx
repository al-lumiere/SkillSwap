import { Suspense } from 'react';
import { FooterLayout } from '@components/footer';
import { Outlet } from 'react-router-dom';
import { Header } from '@features/header';

export const MainLayout = () => (
  <>
    <Header variant="full" />
    <main>
      <Suspense fallback="Загружаем...">
        <Outlet />
      </Suspense>
    </main>
    <FooterLayout />
  </>
);
