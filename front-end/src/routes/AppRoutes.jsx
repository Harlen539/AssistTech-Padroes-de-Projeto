import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const Dashboard = lazy(() => import('../pages/Dashboard'));
const Chamados = lazy(() => import('../pages/Chamados'));
const NovoChamado = lazy(() => import('../pages/NovoChamado'));
const DetalhesChamado = lazy(() => import('../pages/DetalhesChamado'));
const Usuarios = lazy(() => import('../pages/Usuarios'));
const Tecnicos = lazy(() => import('../pages/Tecnicos'));
const Relatorios = lazy(() => import('../pages/Relatorios'));

function AppRoutes({ context }) {
  return (
    <Suspense fallback={<div className="route-loading">Carregando...</div>}>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard {...context} />} />
        <Route path="/chamados" element={<Chamados {...context} />} />
        <Route path="/chamados/:id" element={<DetalhesChamado {...context} />} />
        <Route path="/novo-chamado" element={<NovoChamado {...context} />} />
        <Route path="/usuarios" element={<Usuarios {...context} />} />
        <Route path="/tecnicos" element={<Tecnicos {...context} />} />
        <Route path="/relatorios" element={<Relatorios {...context} />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
