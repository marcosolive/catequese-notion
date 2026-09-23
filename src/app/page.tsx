import Link from "next/link";
import {
  getRootPageTitle,
  getPartesDaCatequese,
} from "@/lib/notion";

export default async function Home() {
  const tituloNotion = await getRootPageTitle();
  const estrutura = await getPartesDaCatequese();

  console.log(
    "ESTRUTURA DA CATEQUESE:",
    JSON.stringify(estrutura, null, 2),
  );

  return (
    <main>
      <section className="border-b border-stone-200 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-stone-500">
              {tituloNotion}
            </p>

            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-stone-900 sm:text-6xl">
              Conhecer a fé para viver a fé.
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-600">
              Um espaço para consultar as aulas, aprofundar o conteúdo e
              continuar a formação na fé.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/aulas"
                className="rounded-lg bg-stone-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-stone-700"
              >
                Acessar aulas
              </Link>

              <Link
                href="/buscar"
                className="rounded-lg border border-stone-300 bg-white px-6 py-3 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
              >
                Buscar conteúdo
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-5xl px-6 py-16">
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-xl border border-stone-200 bg-white p-6">
              <p className="text-2xl">📖</p>

              <h2 className="mt-4 font-medium text-stone-900">
                Sagrada Escritura
              </h2>

              <p className="mt-2 text-sm leading-6 text-stone-600">
                A Palavra de Deus como fundamento da nossa formação.
              </p>
            </div>

            <div className="rounded-xl border border-stone-200 bg-white p-6">
              <p className="text-2xl">📘</p>

              <h2 className="mt-4 font-medium text-stone-900">Catecismo</h2>

              <p className="mt-2 text-sm leading-6 text-stone-600">
                Conteúdo organizado para facilitar o estudo e a consulta.
              </p>
            </div>

            <div className="rounded-xl border border-stone-200 bg-white p-6">
              <p className="text-2xl">✝️</p>

              <h2 className="mt-4 font-medium text-stone-900">Vida cristã</h2>

              <p className="mt-2 text-sm leading-6 text-stone-600">
                Formação que busca conduzir da compreensão da fé à vida.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
