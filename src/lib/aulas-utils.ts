import { partes } from "./aulas";

export function getTodasAsAulas() {
  return partes.flatMap((parte) =>
    parte.secoes.flatMap((secao) => secao.aulas)
  );
}

export function getAulaPorSlug(slug: string) {
  return getTodasAsAulas().find((aula) => aula.slug === slug);
}

export function getNavegacaoAula(slug: string) {
  const aulas = getTodasAsAulas();

  const index = aulas.findIndex((aula) => aula.slug === slug);

  if (index === -1) {
    return null;
  }

  return {
    anterior: aulas[index - 1],
    atual: aulas[index],
    proxima: aulas[index + 1],
  };
}