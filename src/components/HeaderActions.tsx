'use client';

import { usePathname } from 'next/navigation'
import { useAuth, logout } from "../hooks/useAuth";

export function HeaderActions({ showAuth = true }: { showAuth?: boolean }) {
  const pathname = usePathname();
  const { isLoggedIn, userName, isLoading } = useAuth(pathname);
  if (isLoading) {
    // TODO: skeleton loader
    return (
      <div>isLoading</div>
    )
  }
  if (isLoggedIn) {
    return (
      <div className="flex items-center gap-4">
        <a
          href="/url"
          className="px-4 py-2 text-gray-700 hover:text-gray-900 transition"
        >
          Crear nuevo link
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
      </div>
    )
  }
  return (
    <a
      href="/login"
      className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium transition"
    >
      Iniciar sesión
    </a>
  )
}