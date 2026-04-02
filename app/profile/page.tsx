import { redirect } from 'next/navigation';
import { LinkList } from '@/src/components/LinkList';
import { IURL } from '@/src/types/IURL';
import { getURlsByUser } from '@/src/service/urlService.server';
import { getServerCookie } from '@/src/helpers/auth/getServerCookie';

export default async function ProfilePage() {
  const stats = {
    totalLinks: 0,
    activeLinks: 0,
    totalClicks: 0,
    averageClicksPerLink: 0,
  };

  const { isLogged, firebaseUid, email: userEmail, token } = await getServerCookie();

  if (!isLogged || !firebaseUid || !token) {
    redirect('/login');
  }

  let userLinks: IURL[] = [];
  try {
    userLinks = await getURlsByUser(firebaseUid, token);
  } catch (error) {
    console.error('Error fetching user data:', error);
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('es-ES').format(num);
  };

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

          <LinkList links={userLinks} />
        </div>
      </div>
    </div>
  );
}
