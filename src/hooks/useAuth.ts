'use client';

import { useEffect, useState } from 'react';
import { IUser } from '../types/IUser';

export interface AuthState {
  isLoggedIn: boolean;
  userId: string | null;
  userName: string;
  userEmail: string;
  isLoading: boolean;
}

export function useAuth(currentPathname: string): AuthState {
  const [authState, setAuthState] = useState<AuthState>(() => {

    if (typeof window !== 'undefined') {
      const user: IUser = JSON.parse(localStorage.getItem('user') || '{}');
      const token = localStorage.getItem('token');
      
      return {
        isLoggedIn: !!user && !!token,
        userId: user.id || null,
        userName: user.name  || '',
        userEmail: user.email || '',
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
      const user: IUser = JSON.parse(localStorage.getItem('user') || '{}');
      const token = localStorage.getItem('token');
      
      setAuthState({
        isLoggedIn: !!user.id && !!token,
        userId: user.id || null,
        userName: user.name || '',
        userEmail: user.email || '',
        isLoading: false,
      });

      const handleStorageChange = () => {
        const user: IUser = JSON.parse(localStorage.getItem('user') || '{}');
        const token = localStorage.getItem('token');
        
        setAuthState({
          isLoggedIn: !!user.id && !!token,
          userId: user.id || null,
          userName: user.name || '',
          userEmail: user.email || '',
          isLoading: false,
        });
      };

      window.addEventListener('storage', handleStorageChange);
      
      return () => {
        window.removeEventListener('storage', handleStorageChange);
      };
    }
  }, [currentPathname]);

  return authState;
}

export function logout() {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  window.location.href = '/';
}
