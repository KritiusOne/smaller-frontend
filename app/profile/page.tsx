'use client';

import { useEffect, useState } from 'react';
import { Link } from '@src/types/mockTypes';
import { getLinksByUserId, getUserStats } from '@src/helpers/mocks/links';
import { getUserById } from '@src/helpers/mocks/users';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [userLinks, setUserLinks] = useState<Link[]>([]);
  const [stats, setStats] = useState({
    totalLinks: 0,
    activeLinks: 0,
    totalClicks: 0,
    averageClicksPerLink: 0,
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const userInfo = localStorage.getItem('user');
    const user = userInfo ? JSON.parse(userInfo) : null;
    const id = user?.id || null;
    const name = user?.name || null;
    const email = user?.email || null;

    if (!id) {
      router.push('/login');
      return;
    }

    setUserId(id);
    setUserName(name || '');
    setUserEmail(email || '');

    const links = getLinksByUserId(id);
    setUserLinks(links.sort((a: Link, b: Link) => b.createdAt.getTime() - a.createdAt.getTime()));

    
    const userStats = getUserStats(id);
    setStats(userStats);

    setLoading(false);
  }, [router]);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('es-ES').format(num);
  };

  const handleCreateFirstLink = () => {
    router.push('/url');
  }
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando perfil...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Encabezado de perfil */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Mi Perfil</h1>
          <p className="text-sm text-gray-600 mt-1">{userEmail}</p>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">Total Links</p>
            <p className="text-3xl font-bold text-indigo-600">{stats.totalLinks}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">Links Activos</p>
            <p className="text-3xl font-bold text-green-600">{stats.activeLinks}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">Total Clicks</p>
            <p className="text-3xl font-bold text-blue-600">{formatNumber(stats.totalClicks)}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-sm text-gray-600 mb-1">Promedio Clicks</p>
            <p className="text-3xl font-bold text-purple-600">{formatNumber(stats.averageClicksPerLink)}</p>
          </div>
        </div>

        {/* Lista de Links */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Mis Links Acortados</h2>
          </div>

          {userLinks.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-gray-500">No tienes links creados todavía</p>
              <button 
                className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                onClick={handleCreateFirstLink}
              >
                Crear mi primer link
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {userLinks.map((link) => (
                <div key={link.id} className="p-6 hover:bg-gray-50 transition">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {link.title || 'Sin título'}
                        </h3>
                        {link.isActive ? (
                          <span className="px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-full">
                            Activo
                          </span>
                        ) : (
                          <span className="px-2 py-1 text-xs font-semibold bg-gray-100 text-gray-800 rounded-full">
                            Inactivo
                          </span>
                        )}
                      </div>
                      
                      {link.description && (
                        <p className="text-sm text-gray-600 mb-3">{link.description}</p>
                      )}

                      <div className="flex items-center gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Short URL: </span>
                          <a
                            href={link.shortUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-indigo-600 hover:text-indigo-700 font-medium"
                          >
                            {link.shortUrl}
                          </a>
                        </div>
                      </div>

                      <div className="mt-2 text-xs text-gray-500">
                        <span>Original: </span>
                        <a
                          href={link.originalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 hover:text-gray-800 break-all"
                        >
                          {link.originalUrl}
                        </a>
                      </div>
                    </div>

                    <div className="ml-6 text-right">
                      <div className="text-2xl font-bold text-indigo-600">
                        {formatNumber(link.clicks)}
                      </div>
                      <div className="text-xs text-gray-500">clicks</div>
                      <div className="mt-2 text-xs text-gray-400">
                        {formatDate(link.createdAt)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
