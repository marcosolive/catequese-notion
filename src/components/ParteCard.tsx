"use client";

import { useState } from "react";
import Link from "next/link";

type Aula = {
  id: string;
  titulo: string;
};

type Secao = {
  titulo?: string;
  aulas: Aula[];
};

type Parte = {
  id: string;
  titulo: string;
  secoes: Secao[];
};

export default function ParteCard({ parte, index }: { parte: Parte; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  // Calcula o número total de aulas nesta parte
  const totalAulas = parte.secoes.reduce(
    (acc, secao) => acc + secao.aulas.length,
    0
  );

  return (
    <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition hover:border-stone-300 hover:shadow-md">
      {/* Botão Principal do Card da Parte */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-6 text-left focus:outline-none sm:p-8"
      >
        <div className="flex items-start gap-4 sm:gap-6">
          {/* Badge Numérico da Parte */}
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-base font-semibold text-amber-800 border border-amber-200/60">
            0{index + 1}
          </div>

          <div>
            <h2 className="text-xl font-semibold text-stone-900 sm:text-2xl">
              {parte.titulo}
            </h2>
            <p className="mt-1 text-sm text-stone-500">
              {parte.secoes.length} {parte.secoes.length === 1 ? "Seção" : "Seções"} • {totalAulas} {totalAulas === 1 ? "Aula" : "Aulas"}
            </p>
          </div>
        </div>

        {/* Ícone Indicador de Expandir/Recolher */}
        <div className="ml-4 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-stone-100 text-stone-600 transition-transform duration-200">
          <svg
            className={`h-5 w-5 transform transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>

      {/* Conteúdo Expandido (Lista de Seções e Aulas) */}
      {isOpen && (
        <div className="border-t border-stone-100 bg-stone-50/50 p-6 sm:p-8">
          <div className="space-y-8">
            {parte.secoes.map((secao, sIdx) => (
              <div key={`${parte.id}-${sIdx}`}>
                {secao.titulo && (
                  <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-stone-500">
                    {secao.titulo}
                  </h3>
                )}

                {/* Grid de Cards das Aulas */}
                <div className="grid gap-3 sm:grid-cols-2">
                  {secao.aulas.map((aula) => (
                    <Link
                      key={aula.id}
                      href={`/aulas/${aula.id}`}
                      className="group flex items-center justify-between rounded-xl border border-stone-200 bg-white p-4 text-stone-800 transition hover:border-amber-300 hover:bg-amber-50/30 hover:shadow-sm"
                    >
                      <span className="text-sm font-medium leading-relaxed group-hover:text-stone-950">
                        {aula.titulo}
                      </span>
                      <span className="ml-3 text-stone-400 transition-transform group-hover:translate-x-1 group-hover:text-amber-800">
                        →
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}