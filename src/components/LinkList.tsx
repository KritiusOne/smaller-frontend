import Link from 'next/link';
import { IURL } from '@/src/types/IURL';

type LinkListProps = {
  links: IURL[];
};

export const LinkList = ({ links }: LinkListProps) => {
  if (!links || links.length === 0) {
    return (
      <div className="p-12 text-center">
        <p className="text-gray-500">No tienes links creados todavia</p>
        <Link
          href="/url"
          className="mt-4 inline-block px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Crear mi primer link
        </Link>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200">
      {links.map((link) => (
        <div key={link.id} className="p-6 hover:bg-gray-50 transition">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{link.alias || 'Sin titulo'}</h3>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Short URL: </span>
                  <a
                    href={link.originalURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    {link.shortURL}
                  </a>
                </div>
              </div>

              <div className="mt-2 text-xs text-gray-500">
                <span>Original: </span>
                <a
                  href={link.originalURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-800 break-all"
                >
                  {link.originalURL}
                </a>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};