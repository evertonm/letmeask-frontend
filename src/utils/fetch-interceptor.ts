import { clearAuthData, getToken } from './auth-storage';

export async function fetchWithInterceptor(
  input: RequestInfo,
  init?: RequestInit
): Promise<Response> {
  const token = getToken();

  const headers = new Headers(init?.headers);

  // Adicionar o token de autenticação ao cabeçalho, se disponível
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(input, { ...init, headers });

  // Verificar se o token expirou ou se há erro de autenticação
  if (response.status === 401) {
    clearAuthData();
    throw new Error('Usuário não autenticado. Faça login novamente.');
  }

  return response;
}
