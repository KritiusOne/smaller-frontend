'use client';

import { useEffect, useState } from 'react';
import { TrendingLink } from '@src/types/index';
import { getTrendingLinks } from '@src/helpers/mocks/links';
import { useAuth } from '@src/hooks/useAuth';

export default function Home() {
  const [trendingLinks, setTrendingLinks] = useState<TrendingLink[]>([]);
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const links = getTrendingLinks(10);
    setTrendingLinks(links);
  }, []);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-5xl font-bold text-gray-900 mb-4">
          Los Links Más <span className="text-indigo-600">Populares</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Descubre los links acortados que están en tendencia y obtén más clicks
        </p>
      </section>

      {/* Trending Links Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-indigo-50 to-blue-50">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">🔥 Trending Ahora</h3>
                <p className="text-sm text-gray-600 mt-1">Los links más clickeados de la comunidad</p>
              </div>
              <div className="text-sm text-gray-500">
                Top {trendingLinks.length} links
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {trendingLinks.map((link, index) => (
              <div
                key={link.id}
                className="p-6 hover:bg-gray-50 transition-colors group"
              >
                <div className="flex items-start gap-6">
                  {/* Ranking Badge */}
                  <div className="flex-shrink-0">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                        index === 0
                          ? 'bg-yellow-100 text-yellow-700'
                          : index === 1
                          ? 'bg-gray-200 text-gray-700'
                          : index === 2
                          ? 'bg-orange-100 text-orange-700'
                          : 'bg-indigo-50 text-indigo-700'
                      }`}
                    >
                      #{index + 1}
                    </div>
                  </div>

                  {/* Link Info */}
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
                          >
                            {link.shortUrl}
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        </div>

                        <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <span>👤</span>
                            <span>{link.user.name}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span>📅</span>
                            <span>{formatDate(link.createdAt)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="text-right flex-shrink-0">
                        <div className="text-3xl font-bold text-indigo-600 mb-1">
                          {formatNumber(link.clicks)}
                        </div>
                        <div className="text-xs text-gray-500 mb-3">clicks totales</div>
                        
                        <div className="space-y-1 text-xs">
                          <div className="flex items-center justify-end gap-2">
                            <span className="text-gray-500">Última semana:</span>
                            <span className="font-semibold text-green-600">
                              +{formatNumber(link.clicksLastWeek)}
                            </span>
                          </div>
                          <div className="flex items-center justify-end gap-2">
                            <span className="text-gray-500">Último mes:</span>
                            <span className="font-semibold text-blue-600">
                              +{formatNumber(link.clicksLastMonth)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        {!isLoggedIn && (
          <div className="mt-12 text-center bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">¿Quieres crear tus propios links?</h3>
            <p className="text-lg mb-6 opacity-90">
              Únete a nuestra comunidad y comienza a acortar tus URLs hoy mismo
            </p>
            <a
              href="/login"
              className="inline-block px-8 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Comenzar ahora
            </a>
          </div>
        )}
      </main>
    </div>
  );
}
