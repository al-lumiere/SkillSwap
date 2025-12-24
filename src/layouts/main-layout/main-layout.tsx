import { Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from '@store/store';
import { setQuery, setDebouncedQuery, clearSearch } from '@slices/skills/searchSlice';
import { HeaderUI } from '@components/header';
import { FooterLayout } from '@components/footer';
import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
  const dispatch = useDispatch();
  const query = useSelector((s) => s.search.query);

  useEffect(() => {
    const id = setTimeout(() => {
      dispatch(setDebouncedQuery(query.trim()));
    }, 400);

    return () => clearTimeout(id);
  }, [query, dispatch]);

  return (
    <>
      <HeaderUI
        variant="full"
        isUserAuth={false}
        searchValue={query}
        onSearchChange={(v: string) => dispatch(setQuery(v))}
        onSearchClear={() => dispatch(clearSearch())}
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
