import Link from 'next/link';
import { IURL } from '@/src/types/IURL';
import config from '../helpers/config';

type LinkListProps = {
  links: IURL[];
};

export const LinkList = ({ links }: LinkListProps) => {
  if (!links || links.length === 0) {
    return (
      <div className="p-12 text-center">
        <p className="text-[#4f4a4a]">No tienes links creados todavia</p>
        <Link
          href="/url"
          className="btn-solid mt-4 inline-block px-6 py-2.5 text-sm"
        >
          Crear mi primer link
        </Link>
      </div>
    );
  }

  return (
    <div className="divide-y divide-[#cecaca]">
      {links.map((link) => (
        <div key={link.id} className="p-6 transition hover:bg-[#f2dfd9]">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-semibold text-[#1a1919]">{link.alias || 'Sin titulo'}</h3>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <div>
                  <span className="text-[#4f4a4a]">Short URL: </span>
                  <a
                    href={link.originalURL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#c00c3f] hover:text-[#90092f]"
                  >
                    {`${config.app.baseURL}/${link.shortURL}`}
                  </a>
                </div>
              </div>

              <div className="mt-2 text-xs text-[#4f4a4a]">
                <span>Original: </span>
                <a
                  href={link.originalURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-all text-[#353131] hover:text-[#121111]"
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