import { Parte } from "./types";

export const partes: Parte[] = [
  {
    titulo: "PRIMEIRA PARTE - A PROFISSÃO DE FÉ",

    secoes: [
      {
        titulo: "A REVELAÇÃO DIVINA",

        aulas: [
          {
            numero: 1,
            titulo: "POR QUE DEUS ME CRIOU?",
            slug: "por-que-deus-me-criou",
            descricao:
              "O sentido da existência humana e o chamado à felicidade.",
            conteudo: `
Deus criou o homem por amor e para que este participe de sua vida.

A vida humana encontra seu sentido último em Deus. O homem foi criado à imagem e semelhança de Deus e é chamado à felicidade eterna.
            `.trim(),
          },

          {
            numero: 2,
            titulo: "A REVELAÇÃO DIVINA",
            slug: "a-revelacao-divina",
            descricao:
              "Como Deus se revela e vem ao encontro do homem.",
            conteudo: `
Deus se revela ao homem e manifesta o seu desígnio de amor.

A Revelação divina acontece por meio de palavras e acontecimentos intimamente ligados entre si.
            `.trim(),
          },

          {
            numero: 3,
            titulo: "A SAGRADA ESCRITURA",
            slug: "a-sagrada-escritura",
            descricao:
              "A Palavra de Deus e sua importância para a vida cristã.",
            conteudo: `
A Sagrada Escritura é a Palavra de Deus consignada por escrito sob a inspiração do Espírito Santo.
            `.trim(),
          },

          {
            numero: 4,
            titulo: "A RESPOSTA DO HOMEM A DEUS",
            slug: "a-resposta-do-homem-a-deus",
            descricao:
              "A fé como resposta do homem à Revelação de Deus.",
            conteudo: `
A resposta do homem a Deus acontece principalmente pela fé.

A fé é pessoal, mas não é uma realidade isolada. Nós recebemos a fé da Igreja e professamos a fé juntamente com toda a comunidade cristã.
            `.trim(),
          },
        ],
      },

      {
        titulo: "O CREDO",

        aulas: [
          {
            numero: 5,
            titulo: "CREIO EM DEUS",
            slug: "creio-em-deus",
            descricao:
              "A fé em Deus, fundamento da nossa profissão de fé.",
            conteudo: `
Cremos em um só Deus, Pai, Filho e Espírito Santo.
            `.trim(),
          },

          {
            numero: 6,
            titulo: "PAI - TODO-PODEROSO - CRIADOR",
            slug: "pai-todo-poderoso-criador",
            descricao:
              "Deus Pai, sua onipotência e a criação.",
            conteudo: `
Deus é Pai todo-poderoso e criador do céu e da terra.
            `.trim(),
          },
        ],
      },
    ],
  },
];