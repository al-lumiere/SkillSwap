import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '@store/store';
import { clearSearch, setDebouncedQuery, setQuery } from '@slices/skills/searchSlice';
import { HeaderUI } from '@components/header';
import { HeaderProps } from './type';

export const Header: FC<HeaderProps> = (props) => {
  const { variant, onCloseClick } = props;
  // todo: запросить юзера из слайса (когда будет),
  // и отдавать его как: isUserAuth, userName, avatarUrl
  const isUserAuth = false;
  const query = useSelector((s) => s.search.query);
  const dispatch = useDispatch();

  useEffect(() => {
    const id = setTimeout(() => {
      dispatch(setDebouncedQuery(query.trim()));
    }, 400);

    return () => clearTimeout(id);
  }, [query, dispatch]);

  if (variant === 'compact') {
    return <HeaderUI variant="compact" onCloseClick={onCloseClick!} />;
  }

  return (
    <HeaderUI
      variant="full"
      isUserAuth={isUserAuth}
      searchValue={query}
      onSearchChange={(v: string) => dispatch(setQuery(v))}
      onSearchClear={() => dispatch(clearSearch())}
    />
  );
};
