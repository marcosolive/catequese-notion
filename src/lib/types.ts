export type Aula = {
  numero: number;
  titulo: string;
  slug: string;
  descricao?: string;
  conteudo: string;
};

export type Secao = {
  titulo: string;
  aulas: Aula[];
};

export type Parte = {
  titulo: string;
  secoes: Secao[];
};

export type NotionAula = {
  id: string;
  titulo: string;
};

export type NotionSecao = {
  titulo: string;
  aulas: NotionAula[];
};