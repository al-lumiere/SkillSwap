import { Suspense, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { HeaderUI } from '@components/header';
import { FooterLayout } from '@components/footer';

export const MainLayout = () => {
  /* я добавила состояние, чтобы корректно работал поиск, но потом нужно будет перенести это в умный компонент для шапки */
  const [searchValue, setSearchValue] = useState('');

  return (
    <>
      <HeaderUI
        variant="full"
        isUserAuth={false}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        onSearchClear={() => setSearchValue('')}
      />

      <main>
        <Suspense fallback="Загружаем...">
          <Outlet />
        </Suspense>
      </main>

      <FooterLayout />
    </>
  );
};
