'use client';

import { useState } from 'react';
import {useRouter} from 'next/navigation';
import Link from 'next/link';
import { LoginCredentials } from '@src/types/mockTypes';
import { authService } from '@/src/service/authService';
import { useUserStore } from '@/src/zustand/userState';
import { setAuthCookie } from '@/src/helpers/auth/cookies';
import { SignUpForm } from '@/src/components/SignUpForm';

export default function LoginPage() {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: '',
  });
  const [showSignUp, setShowSignUp] = useState(false);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const {logIn} = useUserStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const user = await authService.SignIn(credentials.email, credentials.password);
    if (user) {
      setAuthCookie(user.token);
      
      logIn(user.user.firebaseUid, user.user.name, user.user.email);
      router.push('/profile');
    } else {
      setError('Correo o contraseña incorrectos');
    }

    setLoading(false);
  };

  return (
    <div className="page-shell flex min-h-[calc(100vh-150px)] items-center justify-center py-10">
      <div className="glass-panel w-full max-w-md p-8 sm:p-9">
        <div className="mb-8 text-center">
          <p className="kicker">Acceso</p>
          <h1 className="mt-2 text-3xl font-bold text-[#1a1919]">
            Smaller Links
          </h1>
          <p className="mt-2 text-[#4f4a4a]">
            {showSignUp ? 'Crea tu cuenta para comenzar' : 'Inicia sesión para gestionar tus links'}
          </p>
        </div>

        {showSignUp ? (
          <SignUpForm router={router}  />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-semibold text-[#353131]">
                Correo electrónico
              </label>
              <input
                id="email"
                type="email"
                required
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                className="field"
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-semibold text-[#353131]">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                required
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                className="field"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="rounded-lg border border-[#f99fb9] bg-[#fde7ed] px-4 py-3 text-sm text-[#600620]">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-solid w-full py-3 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </button>
          </form>
        )}

        <button
          type="button"
          onClick={() => {
            setError('');
            setShowSignUp((prev) => !prev);
          }}
          className="mt-4 w-full cursor-pointer text-sm font-semibold text-[#2b3b34] hover:text-[#161d1a]"
        >
          {showSignUp ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
        </button>

        <div className="mt-6 text-center">
          <Link href="/" className="text-sm font-semibold text-[#4f4a4a] hover:text-[#90092f]">
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
