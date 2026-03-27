import { Link, TrendingLink } from '@src/types/mockTypes';
import { mockUsers } from './users';

export const mockLinks: Link[] = [
  {
    id: 'link-1',
    originalUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    shortCode: 'yt-rick',
    shortUrl: 'https://short.ly/yt-rick',
    userId: 'user-1',
    title: 'Video Musical Clásico',
    description: 'Un video que nunca te va a decepcionar',
    clicks: 15420,
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-02-07'),
    isActive: true,
  },
  {
    id: 'link-2',
    originalUrl: 'https://github.com/vercel/next.js',
    shortCode: 'nextjs',
    shortUrl: 'https://short.ly/nextjs',
    userId: 'user-2',
    title: 'Next.js GitHub Repo',
    description: 'El repositorio oficial de Next.js',
    clicks: 8932,
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-08'),
    isActive: true,
  },
  {
    id: 'link-3',
    originalUrl: 'https://www.amazon.com/deals',
    shortCode: 'amz-deals',
    shortUrl: 'https://short.ly/amz-deals',
    userId: 'user-1',
    title: 'Ofertas de Amazon',
    description: 'Las mejores ofertas del día',
    clicks: 12567,
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-02-08'),
    isActive: true,
  },
  {
    id: 'link-4',
    originalUrl: 'https://tailwindcss.com/docs',
    shortCode: 'tw-docs',
    shortUrl: 'https://short.ly/tw-docs',
    userId: 'user-3',
    title: 'Tailwind CSS Docs',
    description: 'Documentación de Tailwind CSS',
    clicks: 6843,
    createdAt: new Date('2024-03-06'),
    updatedAt: new Date('2024-02-07'),
    isActive: true,
  },
  {
    id: 'link-5',
    originalUrl: 'https://www.netflix.com/browse',
    shortCode: 'nflx',
    shortUrl: 'https://short.ly/nflx',
    userId: 'user-4',
    title: 'Netflix',
    description: 'Explorar catálogo de Netflix',
    clicks: 9821,
    createdAt: new Date('2024-01-28'),
    updatedAt: new Date('2024-02-08'),
    isActive: true,
  },
  {
    id: 'link-6',
    originalUrl: 'https://www.coursera.org/courses',
    shortCode: 'learn',
    shortUrl: 'https://short.ly/learn',
    userId: 'user-2',
    title: 'Cursos Online',
    description: 'Los mejores cursos de Coursera',
    clicks: 5234,
    createdAt: new Date('2024-02-05'),
    updatedAt: new Date('2024-02-08'),
    isActive: true,
  },
  {
    id: 'link-7',
    originalUrl: 'https://spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M',
    shortCode: 'spot-top',
    shortUrl: 'https://short.ly/spot-top',
    userId: 'user-1',
    title: 'Top Spotify Playlist',
    description: 'Las canciones más populares',
    clicks: 7654,
    createdAt: new Date('2024-01-22'),
    updatedAt: new Date('2024-02-07'),
    isActive: true,
  },
  {
    id: 'link-8',
    originalUrl: 'https://www.reddit.com/r/programming',
    shortCode: 'r-prog',
    shortUrl: 'https://short.ly/r-prog',
    userId: 'user-3',
    title: 'r/programming',
    description: 'Subreddit de programación',
    clicks: 4521,
    createdAt: new Date('2024-03-07'),
    updatedAt: new Date('2024-02-08'),
    isActive: true,
  },
  {
    id: 'link-9',
    originalUrl: 'https://www.figma.com/community',
    shortCode: 'figma-ui',
    shortUrl: 'https://short.ly/figma-ui',
    userId: 'user-5',
    title: 'Figma Community',
    description: 'Recursos de diseño gratuitos',
    clicks: 3982,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-02-06'),
    isActive: true,
  },
  {
    id: 'link-10',
    originalUrl: 'https://stackoverflow.com/questions/tagged/javascript',
    shortCode: 'so-js',
    shortUrl: 'https://short.ly/so-js',
    userId: 'user-4',
    title: 'Stack Overflow JS',
    description: 'Preguntas de JavaScript',
    clicks: 11234,
    createdAt: new Date('2024-01-30'),
    updatedAt: new Date('2024-02-08'),
    isActive: true,
  },
];

export const getLinksByUserId = (userId: string): Link[] => {
  return mockLinks.filter(link => link.userId === userId);
};

export const getTrendingLinks = (limit: number = 10): TrendingLink[] => {
  return mockLinks
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, limit)
    .map(link => {
      const user = mockUsers.find(u => u.id === link.userId);
      return {
        ...link,
        user: {
          id: user?.id || '',
          name: user?.name || 'Usuario Desconocido',
          avatar: user?.avatar,
        },
        clicksLastWeek: Math.floor(link.clicks * 0.15),
        clicksLastMonth: Math.floor(link.clicks * 0.45),
      };
    });
};

export const getLinkByShortCode = (shortCode: string): Link | undefined => {
  return mockLinks.find(link => link.shortCode === shortCode);
};

export const getUserStats = (userId: string) => {
  const userLinks = getLinksByUserId(userId);
  const totalClicks = userLinks.reduce((sum, link) => sum + link.clicks, 0);
  const activeLinks = userLinks.filter(link => link.isActive).length;

  return {
    totalLinks: userLinks.length,
    activeLinks,
    totalClicks,
    averageClicksPerLink: userLinks.length > 0 ? Math.round(totalClicks / userLinks.length) : 0,
  };
};
