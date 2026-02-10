'use client';

import { useAuth, logout } from '@src/hooks/useAuth';

interface HeaderProps {
  showAuth?: boolean;
}

export function Header({ showAuth = true }: HeaderProps) {
  const { isLoggedIn, userName, isLoading } = useAuth();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <a href="/" className="flex items-center gap-3 hover:opacity-80 transition">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Smaller Links</h1>
              <p className="text-xs text-gray-500">Acorta, comparte, analiza</p>
            </div>
          </a>

          {showAuth && !isLoading && (
            <div className="flex gap-3">
              {isLoggedIn ? (
                <>
                  <a
                    href="/"
                    className="px-4 py-2 text-gray-700 hover:text-gray-900 transition"
                  >
                    Inicio
                  </a>
                  <a
                    href="/profile"
                    className="px-4 py-2 text-indigo-600 hover:text-indigo-700 font-medium transition"
                  >
                    {userName || 'Mi Perfil'}
                  </a>
                  <button
                    onClick={logout}
                    className="px-4 py-2 text-gray-700 hover:text-gray-900 transition"
                  >
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <a
                  href="/login"
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition"
                >
                  Iniciar sesión
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
