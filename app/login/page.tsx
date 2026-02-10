'use client';

import { useState } from 'react';
import {useRouter} from 'next/navigation';
import { LoginCredentials } from '@src/types';
import { validateCredentials } from '@src/helpers/mocks/users';

export default function LoginPage() {
  const [credentials, setCredentials] = useState<LoginCredentials>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    
    await new Promise(resolve => setTimeout(resolve, 500)); // Test delay, remove when connect with API

    const user = validateCredentials(credentials.email, credentials.password);

    if (user) {
      localStorage.setItem('userId', user.id);
      localStorage.setItem('userName', user.name);
      localStorage.setItem('userEmail', user.email);
      
      router.push('/profile'); // redirect
    } else {
      setError('Correo o contraseña incorrectos');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Smaller Links
          </h1>
          <p className="text-gray-600">Inicia sesión para gestionar tus links</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-black mb-2">
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              required
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              placeholder="tu@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-black mb-2">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              required
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </button>
        </form>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-600 mb-2 font-semibold">Usuarios de prueba:</p>
          <ul className="text-xs text-gray-500 space-y-1">
            <li>• juan@example.com / password123</li>
            <li>• maria@example.com / password123</li>
            <li>• demo@example.com / demo123</li>
          </ul>
        </div>

        <div className="mt-6 text-center">
          <a href="/" className="text-sm text-indigo-600 hover:text-indigo-700">
            ← Volver al inicio
          </a>
        </div>
      </div>
    </div>
  );
}
