import { lazy, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import { HomePage } from '@pages/home';
import { MainLayout } from '@layouts/main-layout';
import { AuthLayout } from '@layouts/auth-layout';
import { ProtectedRoute } from '@features/protected-route';
import { useDispatch } from '@store/store';
import { fetchSkills } from '@slices/skills/skillsSlice';
import style from './app.module.css';

const SkillPage = lazy(() => import('@pages/skill/skill'));
const ProfilePage = lazy(() => import('@pages/profile/profile'));
const NotFoundPage = lazy(() => import('@pages/not-found/not-found'));
const ServerErrorPage = lazy(() => import('@pages/server-error/server-error'));
const LoginPage = lazy(() => import('@pages/login/login'));
const RegisterPage = lazy(() => import('@pages/register/register'));

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      fetchSkills({
        listKey: 'home:popular',
        params: { ordering: '-favoritesCount', page: 1, page_size: 18 },
      }),
    );

    dispatch(
      fetchSkills({
        listKey: 'home:new',
        params: { ordering: '-createdAt', page: 1, page_size: 18 },
      }),
    );

    dispatch(
      fetchSkills({
        listKey: 'home:recommended',
        params: { page: 1, page_size: 18 },
      }),
    );
  }, [dispatch]);

  return (
    <div className={style.app}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/skills/:id" element={<SkillPage />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          >
            {/* todo: по мере готовности заменить на компоненты типа <PersonalData /> */}
            <Route index element={<NotFoundPage />} />
            <Route path="requests" element={<NotFoundPage />} />
            <Route path="exchanges" element={<NotFoundPage />} />
            <Route path="favorites" element={<NotFoundPage />} />
            <Route path="skills" element={<NotFoundPage />} />
          </Route>
          <Route path="/server-error" element={<ServerErrorPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route
            path="/login"
            element={
              <ProtectedRoute onlyUnAuth>
                <LoginPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <ProtectedRoute onlyUnAuth>
                <RegisterPage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
