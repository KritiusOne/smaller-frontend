'use client';

import { useEffect, useState } from 'react';
import { getAuthTokenPayload, hasAuthCookie, removeAuthCookie } from '../helpers/auth/cookies';
import { useUserStore } from '../zustand/userState';

export interface AuthState {
  isLoggedIn: boolean;
  userId: string | null;
  userName: string;
  userEmail: string;
  isLoading: boolean;
}

export function useAuth(currentPathname?: string): AuthState {
  const { firebaseUid, name, email, logIn } = useUserStore();
  const [authState, setAuthState] = useState<AuthState>({
    isLoggedIn: false,
    userId: null,
    userName: '',
    userEmail: '',
    isLoading: true,
  });

  useEffect(() => {
    const syncAuthState = () => {
      const hasCookie = hasAuthCookie();
      const tokenPayload = hasCookie ? getAuthTokenPayload() : null;
      const tokenUserId =
        tokenPayload?.firebaseUid || tokenPayload?.userId || tokenPayload?.id || tokenPayload?.sub || null;
      const tokenName = tokenPayload?.name || '';
      const tokenEmail = tokenPayload?.email || '';

      if (hasCookie && !firebaseUid && tokenUserId) {
        logIn(tokenUserId, tokenName, tokenEmail);
      }

      setAuthState({
        isLoggedIn: hasCookie,
        userId: firebaseUid || tokenUserId,
        userName: name || tokenName,
        userEmail: email || tokenEmail,
        isLoading: false,
      });
    };

    syncAuthState();

    window.addEventListener('auth-cookie-changed', syncAuthState);
    window.addEventListener('focus', syncAuthState);
    document.addEventListener('visibilitychange', syncAuthState);

    return () => {
      window.removeEventListener('auth-cookie-changed', syncAuthState);
      window.removeEventListener('focus', syncAuthState);
      document.removeEventListener('visibilitychange', syncAuthState);
    };
  }, [currentPathname, firebaseUid, name, email, logIn]);

  return authState;
}

export function logout() {
  removeAuthCookie();
  useUserStore.getState().logOut();
  if (typeof window !== 'undefined') {
    window.location.href = '/';
  }
}
