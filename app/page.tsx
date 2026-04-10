'use client';

import { useAuth } from '@src/hooks/useAuth';

export default function Home() {
  const { isLoggedIn } = useAuth();
  const coreBenefits = [
    {
      title: 'Enlaces que se recuerdan',
      copy: 'Genera URLs cortas limpias para compartir en redes, bio o campanas sin perder identidad.',
      badge: 'Branding',
      tone: 'bg-[#fccfdc] text-[#600620]',
    },
    {
      title: 'Medicion en tiempo real',
      copy: 'Visualiza clicks y actividad reciente para saber que contenido funciona y que ajustar.',
      badge: 'Metricas',
      tone: 'bg-[#e2e9e6] text-[#2b3b34]',
    },
    {
      title: 'Gestion simple y rapida',
      copy: 'Organiza tus links en segundos con una experiencia clara, directa y lista para escalar.',
      badge: 'Productividad',
      tone: 'bg-[#eddee9] text-[#43233a]',
    },
  ];

  const workflow = [
    {
      step: '01',
      title: 'Crea tu link',
      copy: 'Pega tu URL larga y genera una version corta lista para compartir en minutos.',
    },
    {
      step: '02',
      title: 'Comparte donde quieras',
      copy: 'Publica en redes, email, perfiles o anuncios con un enlace limpio y confiable.',
    },
    {
      step: '03',
      title: 'Analiza y mejora',
      copy: 'Revisa el rendimiento y toma decisiones con datos para optimizar tus resultados.',
    },
  ];

  return (
    <div className="pb-16">
      <section className="page-shell py-12 sm:py-16">
        <div className="glass-panel relative overflow-hidden px-6 py-10 sm:px-10 sm:py-14">
          <div className="pointer-events-none absolute -right-18 -top-18 h-52 w-52 rounded-full bg-[#fccfdc] blur-2xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-[#c4d4cd] blur-2xl" />
          <div className="relative">
            <p className="kicker fade-up" style={{ animationDelay: '40ms' }}>
              Haz que cada click cuente
            </p>
            <h2 className="section-title mt-3 max-w-3xl fade-up" style={{ animationDelay: '120ms' }}>
              Acorta, comparte y mide tus enlaces desde un solo lugar.
            </h2>
            <p className="mt-4 max-w-2xl text-[1.05rem] text-[#4f4a4a] fade-up" style={{ animationDelay: '200ms' }}>
              Smaller te ayuda a convertir enlaces largos en experiencias claras, con seguimiento simple para que tomes mejores decisiones.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3 fade-up" style={{ animationDelay: '260ms' }}>
              <a href="/url" className="btn-solid px-5 py-3 text-sm">
                Crear mi primer link
              </a>
              {!isLoggedIn && (
                <a href="/login" className="btn-outline px-5 py-3 text-sm font-semibold">
                  Entrar a mi cuenta
                </a>
              )}
              <span className="rounded-full border border-[#b5b0b0] bg-[#f9efec] px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-[#4f4a4a]">
                Disponible para uso inmediato
              </span>
            </div>
          </div>
        </div>
      </section>

      <main className="page-shell">
        <section className="glass-panel overflow-hidden">
          <div className="border-b border-[#b5b0b0] bg-[#f2dfd9] px-6 py-5 sm:px-8">
            <p className="kicker">Utilidad real desde el primer dia</p>
            <h3 className="mt-1 text-2xl font-bold text-[#1a1919]">Por que usar Smaller</h3>
            <p className="mt-1 text-sm text-[#4f4a4a]">Todo lo necesario para gestionar enlaces de forma profesional.</p>
          </div>

          <div className="grid gap-4 p-6 sm:grid-cols-3 sm:p-8">
            {coreBenefits.map((item) => (
              <article key={item.title} className="rounded-2xl border border-[#cecaca] bg-white p-5 shadow-[0_10px_24px_rgba(26,25,25,0.06)]">
                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] ${item.tone}`}>
                  {item.badge}
                </span>
                <h4 className="mt-4 text-xl font-bold text-[#1a1919]">{item.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-[#4f4a4a]">{item.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="glass-panel px-6 py-7 sm:px-8 sm:py-8">
            <p className="kicker">Flujo de trabajo</p>
            <h3 className="mt-2 text-2xl font-bold text-[#1a1919]">Como funciona</h3>

            <div className="mt-6 space-y-4">
              {workflow.map((item) => (
                <article key={item.step} className="rounded-2xl border border-[#cecaca] bg-[#fffaf9] p-4">
                  <div className="flex items-start gap-4">
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#1a1919] text-sm font-bold text-white">
                      {item.step}
                    </span>
                    <div>
                      <h4 className="text-lg font-semibold text-[#1a1919]">{item.title}</h4>
                      <p className="mt-1 text-sm text-[#4f4a4a]">{item.copy}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <aside className="glass-panel px-6 py-7 sm:px-8 sm:py-8">
            <p className="kicker">Pensado para crecer</p>
            <h3 className="mt-2 text-2xl font-bold text-[#1a1919]">Resultados claros</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#4f4a4a]">
              No necesitas esperar funciones futuras para obtener valor. Ya puedes centralizar tus enlaces y entender su rendimiento con rapidez.
            </p>

            <div className="mt-6 space-y-3">
              <div className="rounded-xl border border-[#b5b0b0] bg-[#f9efec] px-4 py-3">
                <p className="text-xs uppercase tracking-[0.08em] text-[#696363]">Tiempo de creacion</p>
                <p className="mt-1 text-2xl font-bold text-[#90092f]">Menos de 1 minuto</p>
              </div>
              <div className="rounded-xl border border-[#b5b0b0] bg-[#f0f4f2] px-4 py-3">
                <p className="text-xs uppercase tracking-[0.08em] text-[#696363]">Decisiones con datos</p>
                <p className="mt-1 text-2xl font-bold text-[#2b3b34]">Clicks y evolucion</p>
              </div>
              <div className="rounded-xl border border-[#b5b0b0] bg-[#f6eef4] px-4 py-3">
                <p className="text-xs uppercase tracking-[0.08em] text-[#696363]">Escalabilidad</p>
                <p className="mt-1 text-2xl font-bold text-[#43233a]">De 1 a cientos de links</p>
              </div>
            </div>
          </aside>
        </section>

        {!isLoggedIn && (
          <div className="mt-10 overflow-hidden rounded-2xl border border-[#f00f4f] bg-linear-to-r from-[#c00c3f] to-[#90092f] p-10 text-white shadow-[0_20px_42px_rgba(144,9,47,0.34)]">
            <h3 className="text-3xl font-bold">Empieza hoy y comparte mejor</h3>
            <p className="mt-3 max-w-2xl text-[1.03rem] text-[#fccfdc]">
              Crea tu cuenta para gestionar enlaces con una experiencia rapida, visualmente cuidada y lista para medir resultados.
            </p>
            <a
              href="/login"
              className="mt-6 inline-block rounded-xl border border-white/40 bg-white px-8 py-3 font-semibold text-[#90092f] transition hover:-translate-y-0.5 hover:bg-[#f9efec]"
            >
              Crear cuenta gratis
            </a>
          </div>
        )}
      </main>
    </div>
  );
}
