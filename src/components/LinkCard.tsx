import { Link } from '@src/types';

interface LinkCardProps {
  link: Link;
  rank?: number;
  showUser?: boolean;
  userName?: string;
}

export function LinkCard({ link, rank, showUser, userName }: LinkCardProps) {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('es-ES').format(num);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const getRankColor = () => {
    if (!rank) return 'bg-indigo-50 text-indigo-700';
    if (rank === 1) return 'bg-yellow-100 text-yellow-700';
    if (rank === 2) return 'bg-gray-200 text-gray-700';
    if (rank === 3) return 'bg-orange-100 text-orange-700';
    return 'bg-indigo-50 text-indigo-700';
  };

  return (
    <div className="p-6 hover:bg-gray-50 transition-colors group border-b border-gray-100 last:border-b-0">
      <div className="flex items-start gap-6">
        {rank && (
          <div className="flex-shrink-0">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${getRankColor()}`}
            >
              #{rank}
            </div>
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-indigo-600 transition">
                {link.title || 'Sin título'}
              </h4>
              
              {link.description && (
                <p className="text-sm text-gray-600 mb-3">{link.description}</p>
              )}

              <div className="flex items-center gap-4 text-sm">
                <a
                  href={link.shortUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  {link.shortUrl}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>

              <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                {showUser && userName && (
                  <div className="flex items-center gap-1">
                    <span>👤</span>
                    <span>{userName}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <span>📅</span>
                  <span>{formatDate(link.createdAt)}</span>
                </div>
                {link.isActive ? (
                  <span className="px-2 py-0.5 text-xs font-semibold bg-green-100 text-green-800 rounded-full">
                    Activo
                  </span>
                ) : (
                  <span className="px-2 py-0.5 text-xs font-semibold bg-gray-100 text-gray-800 rounded-full">
                    Inactivo
                  </span>
                )}
              </div>
            </div>

            <div className="text-right flex-shrink-0">
              <div className="text-3xl font-bold text-indigo-600 mb-1">
                {formatNumber(link.clicks)}
              </div>
              <div className="text-xs text-gray-500">clicks</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
