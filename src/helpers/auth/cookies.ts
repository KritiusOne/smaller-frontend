export const AUTH_COOKIE_NAME = 'auth_token';

export type AuthTokenPayload = {
  sub?: string;
  id?: string;
  userId?: string;
  firebaseUid?: string;
  name?: string;
  email?: string;
  [key: string]: unknown;
};

type SetAuthCookieOptions = {
  maxAgeSeconds?: number;
  path?: string;
  sameSite?: 'lax' | 'strict' | 'none';
  secure?: boolean;
};

export function setAuthCookie(
  token: string,
  options: SetAuthCookieOptions = {}
): void {
  if (typeof document === 'undefined') {
    return;
  }

  const {
    maxAgeSeconds = 60 * 60 * 24 * 7,
    path = '/',
    sameSite = 'lax',
    secure = typeof window !== 'undefined' && window.location.protocol === 'https:',
  } = options;

  const cookieParts = [
    `${AUTH_COOKIE_NAME}=${encodeURIComponent(token)}`,
    `Path=${path}`,
    `Max-Age=${maxAgeSeconds}`,
    `SameSite=${sameSite}`,
  ];

  if (secure) {
    cookieParts.push('Secure');
  }

  document.cookie = cookieParts.join('; ');
  window.dispatchEvent(new Event('auth-cookie-changed'));
}

export function getCookieValue(cookieName: string): string | null {
  if (typeof document === 'undefined') {
    return null;
  }

  const cookies = document.cookie ? document.cookie.split('; ') : [];
  const encodedName = `${cookieName}=`;
  const cookie = cookies.find((entry) => entry.startsWith(encodedName));

  if (!cookie) {
    return null;
  }

  return decodeURIComponent(cookie.slice(encodedName.length));
}

export function getAuthTokenFromCookie(): string | null {
  return getCookieValue(AUTH_COOKIE_NAME);
}

export function hasAuthCookie(): boolean {
  const token = getAuthTokenFromCookie();
  return Boolean(token && token.trim().length > 0);
}

export function getAuthTokenPayload(): AuthTokenPayload | null {
  const token = getAuthTokenFromCookie();

  if (!token) {
    return null;
  }

  const tokenParts = token.split('.');
  if (tokenParts.length < 2) {
    return null;
  }

  try {
    const payload = tokenParts[1]
      .replace(/-/g, '+')
      .replace(/_/g, '/');
    const decodedPayload = atob(payload.padEnd(Math.ceil(payload.length / 4) * 4, '='));
    return JSON.parse(decodedPayload) as AuthTokenPayload;
  } catch {
    return null;
  }
}

export function removeAuthCookie(): void {
  if (typeof document === 'undefined') {
    return;
  }

  const secure = typeof window !== 'undefined' && window.location.protocol === 'https:';
  const cookieParts = [
    `${AUTH_COOKIE_NAME}=`,
    'Path=/',
    'Max-Age=0',
    'Expires=Thu, 01 Jan 1970 00:00:00 GMT',
    'SameSite=Lax',
  ];

  if (secure) {
    cookieParts.push('Secure');
  }

  document.cookie = cookieParts.join('; ');
  window.dispatchEvent(new Event('auth-cookie-changed'));
}