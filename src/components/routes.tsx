import { Navigate, Outlet } from 'react-router-dom';
import { getToken } from '@/utils/auth-storage';

// Componente para rotas públicas
export function PublicRoute() {
  const token = getToken();

  // Se o usuário estiver logado, redireciona para a rota padrão (CreateRoom)
  return token ? <Navigate to="/rooms" /> : <Outlet />;
}

// Componente para rotas privadas
export function PrivateRoute() {
  const token = getToken();

  // Se o usuário não estiver logado, redireciona para a rota de Login
  return token ? <Outlet /> : <Navigate to="/" />;
}
