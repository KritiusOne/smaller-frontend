import { redirect } from 'next/navigation';
import { LinkList } from '@/src/components/LinkList';
import { IURL } from '@/src/types/IURL';
import { getURlsByUser } from '@/src/service/urlService.server';
import { getServerCookie } from '@/src/helpers/auth/getServerCookie';

const updateStats = (links: IURL[]) => {
  const stats = {
    totalLinks: links.length,
    activeLinks: links.length, // Assuming all links are active for now, you can adjust this based on your logic
    totalClicks: links.reduce((sum, link) => sum + (link.views || 0), 0),
    averageClicksPerLink: links.length > 0 ? Math.round(links.reduce((sum, link) => sum + (link.views || 0), 0) / links.length) : 0,
  };
  return stats;

}
export default async function ProfilePage() {
  let stats = {
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
    stats = {...updateStats(userLinks)};
  } catch (error) {
    console.error('Error fetching user data:', error);
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('es-ES').format(num);
  };

  return (
    <div className="page-shell py-8 sm:py-10">
      <div className="mb-8 glass-panel px-6 py-7 sm:px-8">
        <p className="kicker">Panel personal</p>
        <h1 className="mt-2 text-3xl font-bold text-[#1a1919]">Mi perfil</h1>
        <p className="mt-1 text-sm text-[#4f4a4a]">{userEmail}</p>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="glass-panel p-5">
          <p className="text-sm text-[#696363]">Total links</p>
          <p className="mt-1 text-3xl font-bold text-[#c00c3f]">{stats.totalLinks}</p>
        </div>
        <div className="glass-panel p-5">
          <p className="text-sm text-[#696363]">Links activos</p>
          <p className="mt-1 text-3xl font-bold text-[#41584e]">{stats.activeLinks}</p>
        </div>
        <div className="glass-panel p-5">
          <p className="text-sm text-[#696363]">Total clicks</p>
          <p className="mt-1 text-3xl font-bold text-[#643557]">{formatNumber(stats.totalClicks)}</p>
        </div>
        <div className="glass-panel p-5">
          <p className="text-sm text-[#696363]">Promedio clicks</p>
          <p className="mt-1 text-3xl font-bold text-[#90092f]">{formatNumber(stats.averageClicksPerLink)}</p>
        </div>
      </div>

      <div className="glass-panel overflow-hidden">
        <div className="border-b border-[#b5b0b0] bg-[#f2dfd9] px-6 py-4">
          <h2 className="text-xl font-semibold text-[#1a1919]">Mis links acortados</h2>
        </div>
        <LinkList links={userLinks} />
      </div>
    </div>
  );
}
