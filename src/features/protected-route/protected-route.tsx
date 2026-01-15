/* eslint-disable react/require-default-props */
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '@store/store';
import { Preloader } from '@ui/preloader';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRoute = ({ onlyUnAuth, children }: ProtectedRouteProps) => {
  const { currentUser, isAuthChecked } = useSelector((store) => store.user);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader variant="overlay" />;
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
