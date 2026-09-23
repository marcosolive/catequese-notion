import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-stone-200 bg-white">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-semibold tracking-tight text-stone-900"
        >
          Catequese
        </Link>

        <nav className="flex items-center gap-6 text-sm">
          <Link
            href="/aulas"
            className="text-stone-600 transition hover:text-stone-900"
          >
            Aulas
          </Link>

          <Link
            href="/buscar"
            className="text-stone-600 transition hover:text-stone-900"
          >
            Buscar
          </Link>
        </nav>
      </div>
    </header>
  );
}