import { lazy, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import { HeaderLayout } from '../widgets/header-layout';
import { SkillsListTest } from '../utils/SkillsListTest';

import { HomePage } from '../pages';
import { MainLayout } from '../layouts/main-layout';
import { AuthLayout } from '../layouts/auth-layout';
import { ProtectedRoute } from '../protected-route';

const SkillPage = lazy(() => import('../pages/skill/skill'));
const ProfilePage = lazy(() => import('../pages/profile/profile'));
const NotFoundPage = lazy(() => import('../pages/not-found/not-found'));
const ServerErrorPage = lazy(() => import('../pages/server-error/server-error'));
const LoginPage = lazy(() => import('../pages/login/login'));
const RegisterPage = lazy(() => import('../pages/register/register'));

const App = () => {
  const [searchValue, setSearchValue] = useState('');
  const [isAllSkillsOpen, setIsAllSkillsOpen] = useState(false);
  const [isAboutActive, setIsAboutActive] = useState(false);

  const handleAboutClick = () => {
    setIsAboutActive(true);
    setIsAllSkillsOpen(false);
    // дальше уже роутер/навигация (если нужно) — здесь по ТЗ логики нет
  };

  const handleAllSkillsClick = () => {
    setIsAboutActive(false);
    setIsAllSkillsOpen((prev) => !prev);
    // здесь должен открываться модал (по ТЗ бизнес-логики нет)
  };

  return (
    <Routes>
      <Route
        element={
          <>
            <HeaderLayout
              isAuthenticated={false}
              onAboutClick={handleAboutClick}
              onAllSkillsClick={handleAllSkillsClick}
              searchValue={searchValue}
              onSearchChange={setSearchValue}
              onSearchClear={() => setSearchValue('')}
              isAboutActive={isAboutActive}
              isAllSkillsActive={isAllSkillsOpen}
            />
            <MainLayout />
          </>
        }
      >
        <Route
          path="/"
          element={
            <>
              <HomePage />
              <main style={{ padding: '24px 80px' }}>
                <SkillsListTest />
              </main>
            </>
          }
        />
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

      <Route
        element={
          <>
            <HeaderLayout variant="auth" onClose={() => window.history.back()} />
            <AuthLayout />
          </>
        }
      >
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
  );
};

export default App;
