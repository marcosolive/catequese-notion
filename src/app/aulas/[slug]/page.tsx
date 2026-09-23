import Link from "next/link";
import { notFound } from "next/navigation";
import { getPartesDaCatequese, getBlockChildren } from "@/lib/notion";
import NotionBlocks from "@/components/NotionBlocks";

type AulaPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function AulaPage({ params }: AulaPageProps) {
  const { slug } = await params;

  const partes = await getPartesDaCatequese();

  const aulas = partes.flatMap((parte) =>
    parte.secoes.flatMap((secao) => secao.aulas),
  );

  const aulaIndex = aulas.findIndex((aula) => aula.id === slug);

  if (aulaIndex === -1) {
    notFound();
  }

  const aula = aulas[aulaIndex];
  const aulaAnterior = aulas[aulaIndex - 1];
  const proximaAula = aulas[aulaIndex + 1];

  const conteudo = await getBlockChildren(aula.id);

  console.log("CONTEÚDO DA AULA:", JSON.stringify(conteudo, null, 2));

  return (
    <main>
      <div className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
        <Link
          href="/aulas"
          className="text-sm text-stone-500 transition hover:text-stone-900"
        >
          ← Todas as aulas
        </Link>

        <article className="mt-10">
          <header>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-stone-500">
              Aula
            </p>

            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-stone-900 sm:text-5xl">
              {aula.titulo}
            </h1>
          </header>

          {/* <div className="mt-12">
            <p className="text-lg leading-8 text-stone-600">
              Conteúdo da aula vindo do Notion.
            </p>
          </div> */}
          <div className="mt-12">
            <NotionBlocks blocks={conteudo.results} />
          </div>
        </article>

        <nav className="mt-16 grid gap-3 border-t border-stone-200 pt-8 sm:grid-cols-2">
          <div>
            {aulaAnterior && (
              <Link
                href={`/aulas/${aulaAnterior.id}`}
                className="block rounded-xl border border-stone-200 bg-white p-5 transition hover:border-stone-300 hover:shadow-sm"
              >
                <p className="text-xs font-medium uppercase tracking-wider text-stone-400">
                  Aula anterior
                </p>

                <p className="mt-2 font-medium text-stone-900">
                  ← {aulaAnterior.titulo}
                </p>
              </Link>
            )}
          </div>

          <div>
            {proximaAula && (
              <Link
                href={`/aulas/${proximaAula.id}`}
                className="block rounded-xl border border-stone-200 bg-white p-5 text-left transition hover:border-stone-300 hover:shadow-sm sm:text-right"
              >
                <p className="text-xs font-medium uppercase tracking-wider text-stone-400">
                  Próxima aula
                </p>

                <p className="mt-2 font-medium text-stone-900">
                  {proximaAula.titulo} →
                </p>
              </Link>
            )}
          </div>
        </nav>
      </div>
    </main>
  );
}
