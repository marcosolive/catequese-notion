import { Client } from "@notionhq/client";
import type { NotionSecao } from "./types";

if (!process.env.NOTION_TOKEN) {
  throw new Error("NOTION_TOKEN não foi configurado.");
}

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export async function getRootPage() {
  const pageId = process.env.NOTION_ROOT_PAGE_ID;

  if (!pageId) {
    throw new Error("NOTION_ROOT_PAGE_ID não foi configurado.");
  }

  return notion.pages.retrieve({
    page_id: pageId,
  });
}

export async function getRootPageTitle() {
  const page = await getRootPage();

  if ("properties" in page && "title" in page.properties) {
    const titleProperty = page.properties.title;

    if (titleProperty.type === "title") {
      return titleProperty.title
        .map((item) => item.plain_text)
        .join("");
    }
  }

  return "Catequese de Adultos";
}

export async function getRootPageChildren() {
  const pageId = process.env.NOTION_ROOT_PAGE_ID;

  if (!pageId) {
    throw new Error("NOTION_ROOT_PAGE_ID não foi configurado.");
  }

  return notion.blocks.children.list({
    block_id: pageId,
  });
}

export async function getBlockChildren(blockId: string) {
  return notion.blocks.children.list({
    block_id: blockId,
  });
}


export async function getSecoesDaParte(
  blockId: string,
): Promise<NotionSecao[]> {
  const response = await getBlockChildren(blockId);

  const secoes: NotionSecao[] = [];

  let secaoAtual: NotionSecao | null = null;

  for (const block of response.results) {
    if (!("type" in block)) {
      continue;
    }

    if (block.type === "heading_2") {
      const titulo = block.heading_2.rich_text
        .map((item) => item.plain_text)
        .join("");

      secaoAtual = {
        titulo,
        aulas: [],
      };

      secoes.push(secaoAtual);

      continue;
    }

    if (block.type === "child_page") {
      if (!secaoAtual) {
        // Parte sem seções: cria uma seção única sem título
        secaoAtual = {
          titulo: "",
          aulas: [],
        };

        secoes.push(secaoAtual);
      }

      secaoAtual.aulas.push({
        id: block.id,
        titulo: block.child_page.title,
      });
    }
  }

  return secoes;
}

export async function getPartesDaCatequese() {
  const children = await getRootPageChildren();

  const partes = children.results.filter(
    (block) =>
      "type" in block &&
      block.type === "heading_2" &&
      "heading_2" in block &&
      block.heading_2.is_toggleable,
  );

  return Promise.all(
    partes.map(async (parte) => {
      const secoes = await getSecoesDaParte(parte.id);

      const titulo =
        "heading_2" in parte
          ? parte.heading_2.rich_text
              .map((item) => item.plain_text)
              .join("")
          : "";

      return {
        id: parte.id,
        titulo,
        secoes,
      };
    }),
  );
}

export async function getConteudoDaAula(aulaId: string) {
  const response = await getBlockChildren(aulaId);

  const textos: string[] = [];

  for (const block of response.results) {
    if (!("type" in block)) {
      continue;
    }

    switch (block.type) {
      case "paragraph":
        textos.push(
          block.paragraph.rich_text
            .map((item) => item.plain_text)
            .join(""),
        );
        break;

      case "heading_1":
        textos.push(
          block.heading_1.rich_text
            .map((item) => item.plain_text)
            .join(""),
        );
        break;

      case "heading_2":
        textos.push(
          block.heading_2.rich_text
            .map((item) => item.plain_text)
            .join(""),
        );
        break;

      case "heading_3":
        textos.push(
          block.heading_3.rich_text
            .map((item) => item.plain_text)
            .join(""),
        );
        break;

      case "quote":
        textos.push(
          block.quote.rich_text
            .map((item) => item.plain_text)
            .join(""),
        );
        break;

      case "bulleted_list_item":
        textos.push(
          block.bulleted_list_item.rich_text
            .map((item) => item.plain_text)
            .join(""),
        );
        break;

      case "numbered_list_item":
        textos.push(
          block.numbered_list_item.rich_text
            .map((item) => item.plain_text)
            .join(""),
        );
        break;
    }
  }

  return textos.join(" ");
}
