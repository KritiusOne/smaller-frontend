'use client';

import { usePathname } from 'next/navigation'
import { useAuth, logout } from "../hooks/useAuth";

export function HeaderActions({ showAuth = true }: { showAuth?: boolean }) {
  const pathname = usePathname();
  const { isLoggedIn, userName, isLoading } = useAuth(pathname);

  if (!showAuth) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="h-9 w-28 animate-pulse rounded-lg border border-[#b5b0b0] bg-[#f2dfd9]" />
    )
  }

  if (isLoggedIn) {
    return (
      <div className="flex items-center gap-2 sm:gap-3">
        <a
          href="/url"
          className="hidden rounded-xl border border-[#b5b0b0] bg-[#f9efec] px-3 py-2 text-sm font-semibold text-[#353131] transition hover:-translate-y-0.5 hover:border-[#c00c3f] sm:inline-block"
        >
          Crear nuevo link
        </a>
        <a
          href="/profile"
          className="rounded-xl bg-[#e2e9e6] px-3 py-2 text-sm font-semibold text-[#2b3b34] transition hover:-translate-y-0.5 hover:bg-[#c4d4cd]"
        >
          {userName || 'Mi Perfil'}
        </a>
        <button
          onClick={logout}
          className="rounded-xl px-3 py-2 text-sm font-semibold text-[#4f4a4a] transition hover:bg-[#f2dfd9]"
        >
          Cerrar sesión
        </button>
      </div>
    )
  }
  return (
    <a
      href="/login"
      className="btn-solid px-5 py-2.5 text-sm"
    >
      Iniciar sesión
    </a>
  )
}