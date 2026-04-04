'use client';

import { useEffect, useState } from 'react';
import { getAuthTokenPayload, hasAuthCookie, removeAuthCookie, setAuthCookie } from '../helpers/auth/cookies';
import { useUserStore } from '../zustand/userState';
import { onIdTokenChanged } from 'firebase/auth';
import { auth } from '../service/authService';
import config from '../helpers/config';

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
    const authCookieMaxAgeSeconds =
      Number.isFinite(config.app.authCookieMaxAgeSeconds) && config.app.authCookieMaxAgeSeconds > 0
        ? config.app.authCookieMaxAgeSeconds
        : 30;
    const refreshIntervalMs = Math.max(5000, Math.floor((authCookieMaxAgeSeconds * 1000) / 2));

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

    const refreshCurrentUserToken = async () => {
      const currentUser = auth.currentUser;

      if (!currentUser) {
        return;
      }

      const token = await currentUser.getIdToken(true);
      setAuthCookie(token);
      syncAuthState();
    };

    const handleSessionActivity = () => {
      if (document.visibilityState === 'hidden') {
        return;
      }

      void refreshCurrentUserToken();
    };

    syncAuthState();

    const unsubscribeAuth = onIdTokenChanged(auth, async (user) => {
      if (user) {
        const token = await user.getIdToken(true);
        setAuthCookie(token);
        syncAuthState();
      } else {
        removeAuthCookie();
        syncAuthState();
      }
    });

    const refreshTimer = window.setInterval(() => {
      void refreshCurrentUserToken();
    }, refreshIntervalMs);

    void refreshCurrentUserToken();

    window.addEventListener('auth-cookie-changed', syncAuthState);
    window.addEventListener('focus', handleSessionActivity);
    document.addEventListener('visibilitychange', handleSessionActivity);

    return () => {
      unsubscribeAuth();
      window.clearInterval(refreshTimer);
      window.removeEventListener('auth-cookie-changed', syncAuthState);
      window.removeEventListener('focus', handleSessionActivity);
      document.removeEventListener('visibilitychange', handleSessionActivity);
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
