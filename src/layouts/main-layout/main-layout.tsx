import { Suspense, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { HeaderUI } from '@components/header';

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

      {/*
      <HeaderUI
        variant="full"
        isUserAuth
        userName="Мария"
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        onSearchClear={() => setSearchValue('')}
      />
      */}

      <main>
        <Suspense fallback="Загружаем...">
          <Outlet />
        </Suspense>
      </main>

      {/* TODO: когда появится футер, импортировать его и использовать здесь <AppFooter /> */}
      <h1>Футер</h1>
    </>
  );
};
