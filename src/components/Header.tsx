import { HeaderActions } from "./HeaderActions";
import Link from "next/link";
interface HeaderProps {
  showAuth?: boolean;
}

export function Header({ showAuth = true }: HeaderProps) {

  return (
    <header className="sticky top-0 z-30 border-b border-[#b5b0b0] bg-[#f9efec]/95 backdrop-blur-md">
      <div className="page-shell py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 transition hover:opacity-90">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#f00f4f]/35 bg-linear-to-br from-[#c00c3f] to-[#90092f] text-xl font-bold text-white shadow-[0_10px_20px_rgba(144,9,47,0.32)]">
              S
            </div>
            <div>
              <h1 className="text-2xl font-bold leading-none text-[#1a1919]">Smaller</h1>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-[#4f4a4a]">
                Acorta, comparte, analiza
              </p>
            </div>
          </Link>
          <HeaderActions showAuth={showAuth} />
        </div>
      </div>
    </header>
  );
}
