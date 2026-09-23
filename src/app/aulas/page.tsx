import Link from "next/link";
import { getPartesDaCatequese } from "@/lib/notion"; // 1. Importe a função aqui

export default async function AulasPage() {
  // 2. Chame a função aqui (usando Promise.all para buscar em paralelo e ganhar performance)
  const [partes] = await Promise.all([
    getPartesDaCatequese(),
  ]);

  return (
    <main className="min-h-screen bg-stone-50">
      <div className="mx-auto max-w-5xl px-6 py-12 sm:py-16">
        <header className="mb-12">
          <Link
            href="/"
            className="text-sm text-stone-500 hover:text-stone-900"
          >
            ← Voltar para o início
          </Link>

          <h1 className="mt-6 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
            Aulas de Catequese
          </h1>

          <p className="mt-3 text-stone-600">
            Consulte o conteúdo das aulas e aprofunde sua formação na fé.
          </p>
        </header>

        <div className="space-y-10">
          {partes.map((parte) => (
            <section key={parte.id}>
              <h2 className="text-2xl font-semibold text-stone-900">
                {parte.titulo}
              </h2>

              <div className="mt-6 space-y-6">
                {parte.secoes.map((secao, index) => (
                  <div
                    key={`${parte.id}-${index}`}
                    className="rounded-xl border border-stone-200 bg-white p-6"
                  >
                    {secao.titulo && (
                      <h3 className="text-lg font-medium text-stone-900">
                        {secao.titulo}
                      </h3>
                    )}

                    <div className="mt-4 divide-y divide-stone-100">
                      {secao.aulas.map((aula) => (
                        <Link
                          key={aula.id}
                          href={`/aulas/${aula.id}`}
                          className="flex items-center justify-between py-4 text-stone-700 transition hover:text-stone-950"
                        >
                          <span>{aula.titulo}</span>

                          <span className="ml-4 text-stone-400">
                            →
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}