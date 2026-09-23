"use client";

import { useState } from "react";
import Link from "next/link";

type Aula = {
  id: string;
  titulo: string;
  conteudo: string;
};

type BuscaAulasProps = {
  aulas: Aula[];
};

export default function BuscaAulas({ aulas }: BuscaAulasProps) {
  const [busca, setBusca] = useState("");

  // const resultados = aulas.filter((aula) =>
  //   aula.titulo.toLowerCase().includes(busca.toLowerCase()),
  // );

  const termo = busca.trim().toLowerCase();

  const resultados = aulas.filter((aula) => {
    if (!termo) {
      return false;
    }

    return (
      aula.titulo.toLowerCase().includes(termo) ||
      aula.conteudo.toLowerCase().includes(termo)
    );
  });
  return (
    <>
      <form
        className="mt-10 max-w-2xl"
        onSubmit={(event) => event.preventDefault()}
      >
        <label
          htmlFor="search"
          className="mb-2 block text-sm font-medium text-stone-700"
        >
          O que você procura?
        </label>

        <div className="flex gap-3">
          <input
            id="search"
            type="search"
            value={busca}
            onChange={(event) => setBusca(event.target.value)}
            placeholder="Ex.: Eucaristia, Confissão, Espírito Santo..."
            className="min-w-0 flex-1 rounded-lg border border-stone-300 bg-white px-4 py-3 text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-stone-500 focus:ring-2 focus:ring-stone-200"
          />

          <button
            type="submit"
            className="rounded-lg bg-stone-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-stone-700"
          >
            Buscar
          </button>
        </div>
      </form>

      {busca.trim() !== "" && (
        <div className="mt-10 max-w-2xl">
          <p className="mb-4 text-sm text-stone-500">
            {resultados.length === 0
              ? "Nenhuma aula encontrada."
              : `${resultados.length} aula${
                  resultados.length === 1 ? "" : "s"
                } encontrada${resultados.length === 1 ? "" : "s"}.`}
          </p>

          <div className="space-y-3">
            {resultados.map((aula) => (
              <Link
                key={aula.id}
                href={`/aulas/${aula.id}`}
                className="block rounded-xl border border-stone-200 bg-white p-5 transition hover:border-stone-300 hover:shadow-sm"
              >
                <p className="text-xs font-medium uppercase tracking-wider text-stone-400">
                  Aula
                </p>

                <h2 className="mt-2 font-medium text-stone-900">
                  {aula.titulo}
                </h2>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
