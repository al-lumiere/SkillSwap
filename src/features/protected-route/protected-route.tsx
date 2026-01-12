/* eslint-disable react/require-default-props */
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '@store/store';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({ onlyUnAuth, children }: ProtectedRouteProps) => {
  const { currentUser, status } = useSelector((store) => store.user);
  const location = useLocation();

  const isAuthChecking = status === 'idle' || status === 'loading';

  if (isAuthChecking) {
    // return <Preloader />;
    return <h1>Загрузка</h1>;
  }

  // Маршруты "только для авторизованных"
  if (!onlyUnAuth && !currentUser) {
    return <Navigate replace to="/login" state={{ from: location }} />;
  }

  // Маршруты "только для гостей"
  if (onlyUnAuth && currentUser) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate replace to={from} />;
  }

  return children;
};
