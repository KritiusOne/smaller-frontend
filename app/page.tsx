'use client';

import { useState } from 'react';
import { TrendingLink } from '@src/types/mockTypes';
import { getTrendingLinks } from '@src/helpers/mocks/links';
import { useAuth } from '@src/hooks/useAuth';

export default function Home() {
  const [trendingLinks] = useState<TrendingLink[]>(() => getTrendingLinks(10));
  const { isLoggedIn } = useAuth();

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
    <div className="pb-16">
      <section className="page-shell py-12 sm:py-16">
        <div className="glass-panel relative overflow-hidden px-6 py-10 sm:px-10 sm:py-14">
          <div className="pointer-events-none absolute -right-18 -top-18 h-52 w-52 rounded-full bg-[#fccfdc] blur-2xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-[#c4d4cd] blur-2xl" />
          <div className="relative">
            <p className="kicker fade-up" style={{ animationDelay: '40ms' }}>
              Ranking comunitario en vivo
            </p>
            <h2 className="section-title mt-3 max-w-3xl fade-up" style={{ animationDelay: '120ms' }}>
              Los links que estan capturando atencion hoy.
            </h2>
            <p className="mt-4 max-w-2xl text-[1.05rem] text-[#4f4a4a] fade-up" style={{ animationDelay: '200ms' }}>
              Descubre que contenidos convierten mejor, analiza sus cifras y toma ideas para tu proxima campana.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3 fade-up" style={{ animationDelay: '260ms' }}>
              <a href="/url" className="btn-solid px-5 py-3 text-sm">
                Crear nuevo link
              </a>
              {!isLoggedIn && (
                <a href="/login" className="btn-outline px-5 py-3 text-sm font-semibold">
                  Unirme a Smaller
                </a>
              )}
              <span className="rounded-full border border-[#b5b0b0] bg-[#f9efec] px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-[#4f4a4a]">
                Top {trendingLinks.length} en tendencia
              </span>
            </div>
          </div>
        </div>
      </section>

      <main className="page-shell">
        <div className="glass-panel overflow-hidden">
          <div className="border-b border-[#b5b0b0] bg-[#f2dfd9] px-6 py-5 sm:px-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="kicker">Pulso de la semana</p>
                <h3 className="mt-1 text-2xl font-bold text-[#1a1919]">Trending ahora</h3>
                <p className="mt-1 text-sm text-[#4f4a4a]">Los links mas cliqueados de la comunidad</p>
              </div>
              <div className="rounded-xl border border-[#b5b0b0] bg-white px-4 py-2 text-sm font-semibold text-[#4f4a4a]">
                Actualizado: {formatDate(new Date())}
              </div>
            </div>
          </div>

          <div className="divide-y divide-[#cecaca]">
            {trendingLinks.map((link, index) => (
              <div
                key={link.id}
                className="group p-6 transition-colors hover:bg-[#f2dfd9] sm:p-7"
              >
                <div className="flex items-start gap-6">
                  <div className="shrink-0">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-2xl text-base font-bold ${
                        index === 0
                            ? 'bg-[#fccfdc] text-[#600620]'
                          : index === 1
                            ? 'bg-[#e6e5e5] text-[#353131]'
                          : index === 2
                            ? 'bg-[#eddee9] text-[#43233a]'
                            : 'bg-[#e2e9e6] text-[#2b3b34]'
                      }`}
                    >
                      #{index + 1}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="mb-1 text-lg font-semibold text-[#1a1919] transition group-hover:text-[#90092f]">
                          {link.title || 'Sin título'}
                        </h4>
                        {link.description && (
                          <p className="mb-3 text-sm text-[#4f4a4a]">{link.description}</p>
                        )}
                        
                        <div className="flex items-center gap-4 text-sm">
                          <a
                            href={link.shortUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 font-semibold text-[#c00c3f] hover:text-[#90092f]"
                          >
                            {link.shortUrl}
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        </div>

                        <div className="mt-3 flex items-center gap-4 text-xs text-[#696363]">
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

                      <div className="shrink-0 rounded-xl border border-[#b5b0b0] bg-[#f9efec] px-4 py-3 text-right">
                        <div className="mb-1 text-3xl font-bold text-[#c00c3f]">
                          {formatNumber(link.clicks)}
                        </div>
                        <div className="mb-3 text-xs text-[#696363]">clicks totales</div>
                        
                        <div className="space-y-1 text-xs font-medium">
                          <div className="flex items-center justify-end gap-2">
                            <span className="text-[#696363]">Ultima semana:</span>
                            <span className="text-[#41584e]">
                              +{formatNumber(link.clicksLastWeek)}
                            </span>
                          </div>
                          <div className="flex items-center justify-end gap-2">
                            <span className="text-[#696363]">Ultimo mes:</span>
                            <span className="text-[#643557]">
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

        {!isLoggedIn && (
          <div className="mt-10 overflow-hidden rounded-2xl border border-[#f00f4f] bg-linear-to-r from-[#c00c3f] to-[#90092f] p-10 text-white shadow-[0_20px_42px_rgba(144,9,47,0.34)]">
            <h3 className="text-3xl font-bold">Quieres crear tus propios links?</h3>
            <p className="mt-3 max-w-2xl text-[1.03rem] text-[#fccfdc]">
              Unete a la comunidad y construye URLs cortas con estilo, rapidez y metricas accionables.
            </p>
            <a
              href="/login"
              className="mt-6 inline-block rounded-xl border border-white/40 bg-white px-8 py-3 font-semibold text-[#90092f] transition hover:-translate-y-0.5 hover:bg-[#f9efec]"
            >
              Empezar ahora
            </a>
          </div>
        )}
      </main>
    </div>
  );
}
