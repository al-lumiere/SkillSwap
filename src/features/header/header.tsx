import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '@store/store';
import { clearSearch, setDebouncedQuery, setQuery } from '@slices/skills/searchSlice';
import { HeaderUI } from '@components/header';
import { HeaderProps } from './type';

export const Header: FC<HeaderProps> = (props) => {
  const { variant, onCloseClick } = props;

  const user = useSelector((s) => s.user.currentUser);
  const isUserAuth = !!user;

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
      userName={user?.name}
      // avatarUrl={mediaUrl(user?.avatar ?? '')} // если ссылка на картинку
      avatarUrl={user?.avatar ?? ''} // если картинка закодированна в base64
      searchValue={query}
      onSearchChange={(v: string) => dispatch(setQuery(v))}
      onSearchClear={() => dispatch(clearSearch())}
    />
  );
};
