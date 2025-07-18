import Cookies from 'js-cookie';
import type { LoginResponse } from '@/http/types/login-response';

const TOKEN_KEY = 'token';
const REFRESH_TOKEN_KEY = 'refreshToken';
const USER_KEY = 'user';

export function saveAuthData(
  token: string,
  refreshToken: string,
  user: LoginResponse['user']
) {
  Cookies.set(TOKEN_KEY, token, { secure: true, sameSite: 'strict' });
  Cookies.set(REFRESH_TOKEN_KEY, refreshToken, {
    secure: true,
    sameSite: 'strict',
  });

  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

// Recuperar token
export function getToken(): string | null {
  const match = document.cookie.match(new RegExp(`(^| )${TOKEN_KEY}=([^;]+)`));
  return match ? match[2] : null;
}

export function getRefreshToken(): string | null {
  const match = document.cookie.match(
    new RegExp(`(^| )${REFRESH_TOKEN_KEY}=([^;]+)`)
  );
  return match ? match[2] : null;
}

export function getUser(): LoginResponse['user'] | null {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
}

export function clearAuthData() {
  Cookies.remove(TOKEN_KEY);
  Cookies.remove(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}
