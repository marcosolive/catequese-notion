import BuscaAulas from "@/components/BuscaAulas";
import {
  getPartesDaCatequese,
  getConteudoDaAula,
} from "@/lib/notion";

export default async function BuscarPage() {
  const partes = await getPartesDaCatequese();

  const aulas = partes.flatMap((parte) =>
    parte.secoes.flatMap((secao) => secao.aulas),
  );

  const aulasComConteudo = await Promise.all(
    aulas.map(async (aula) => ({
      ...aula,
      conteudo: await getConteudoDaAula(aula.id),
    })),
  );

  return (
    <main>
      <div className="mx-auto max-w-5xl px-6 py-12 sm:py-16">
        <header>
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-stone-500">
            Pesquisa
          </p>

          <h1 className="mt-2 text-4xl font-semibold tracking-tight text-stone-900">
            Buscar conteúdo
          </h1>

          <p className="mt-4 max-w-2xl text-stone-600">
            Encontre uma aula ou um assunto dentro do material da catequese.
          </p>
        </header>

        <BuscaAulas aulas={aulasComConteudo} />
      </div>
    </main>
  );
}