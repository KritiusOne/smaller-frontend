'use client';

import { useEffect, useState } from 'react';

export interface AuthState {
  isLoggedIn: boolean;
  userId: string | null;
  userName: string;
  userEmail: string;
  isLoading: boolean;
}

export function useAuth(): AuthState {
  const [authState, setAuthState] = useState<AuthState>(() => {

    if (typeof window !== 'undefined') {
      const userId = localStorage.getItem('userId');
      const userName = localStorage.getItem('userName');
      const userEmail = localStorage.getItem('userEmail');
      
      return {
        isLoggedIn: !!userId,
        userId: userId || null,
        userName: userName || '',
        userEmail: userEmail || '',
        isLoading: false,
      };
    }
    
    return {
      isLoggedIn: false,
      userId: null,
      userName: '',
      userEmail: '',
      isLoading: true,
    };
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userId = localStorage.getItem('userId');
      const userName = localStorage.getItem('userName');
      const userEmail = localStorage.getItem('userEmail');
      
      setAuthState({
        isLoggedIn: !!userId,
        userId: userId || null,
        userName: userName || '',
        userEmail: userEmail || '',
        isLoading: false,
      });

      const handleStorageChange = () => {
        const userId = localStorage.getItem('userId');
        const userName = localStorage.getItem('userName');
        const userEmail = localStorage.getItem('userEmail');
        
        setAuthState({
          isLoggedIn: !!userId,
          userId: userId || null,
          userName: userName || '',
          userEmail: userEmail || '',
          isLoading: false,
        });
      };

      window.addEventListener('storage', handleStorageChange);
      
      return () => {
        window.removeEventListener('storage', handleStorageChange);
      };
    }
  }, []);

  return authState;
}

export function logout() {
  localStorage.removeItem('userId');
  localStorage.removeItem('userName');
  localStorage.removeItem('userEmail');
  window.location.href = '/';
}
