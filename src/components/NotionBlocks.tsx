import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

type NotionBlocksProps = {
  blocks: BlockObjectResponse[];
};

function RichText({
  richText,
}: {
  richText: Array<{
    type: string;
    plain_text: string;
    annotations?: {
      bold?: boolean;
      italic?: boolean;
      underline?: boolean;
      strikethrough?: boolean;
      code?: boolean;
      color?: string;
    };
  }>;
}) {
  return (
    <>
      {richText.map((item, index) => {
        const annotations = item.annotations;

        let content: React.ReactNode = item.plain_text;

        if (annotations?.code) {
          content = (
            <code className="rounded bg-stone-100 px-1.5 py-0.5 text-[0.9em]">
              {content}
            </code>
          );
        }

        if (annotations?.bold) {
          content = <strong>{content}</strong>;
        }

        if (annotations?.italic) {
          content = <em>{content}</em>;
        }

        if (annotations?.underline) {
          content = <u>{content}</u>;
        }

        if (annotations?.strikethrough) {
          content = <s>{content}</s>;
        }

        return <span key={index}>{content}</span>;
      })}
    </>
  );
}

function isYellowParagraph(block: BlockObjectResponse) {
  if (block.type !== "paragraph") {
    return false;
  }

  return block.paragraph.rich_text.some(
    (item) => item.annotations.color === "yellow_background"
  );
}

function getBlockRichText(block: BlockObjectResponse) {
  if (block.type !== "paragraph") {
    return [];
  }

  return block.paragraph.rich_text;
}

export default function NotionBlocks({ blocks }: NotionBlocksProps) {
  const elementos: React.ReactNode[] = [];

  let i = 0;

  while (i < blocks.length) {
    const block = blocks[i];

    /*
     * BLOCO DE DESTAQUE
     *
     * Agrupa todos os parágrafos amarelos consecutivos
     * em uma única caixa.
     */
    if (isYellowParagraph(block)) {
      const destaque = [];

      while (i < blocks.length && isYellowParagraph(blocks[i])) {
        destaque.push(blocks[i]);
        i++;
      }

      elementos.push(
        <div
          key={`destaque-${block.id}`}
          className="rounded-2xl border border-amber-200 bg-amber-50/70 px-6 py-5 shadow-sm"
        >
          <div className="mb-4 flex items-center gap-2">
            <span className="text-sm">📖</span>

            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">
              Compêndio do Catecismo
            </span>
          </div>

          <div className="space-y-3 text-stone-800">
            {destaque.map((destaqueBlock) => {
              const richText = getBlockRichText(destaqueBlock);

              return (
                <p
                  key={destaqueBlock.id}
                  className="text-base leading-7"
                >
                  <RichText richText={richText} />
                </p>
              );
            })}
          </div>
        </div>
      );

      continue;
    }

    /*
     * PARÁGRAFO NORMAL
     */
    if (block.type === "paragraph") {
      const richText = block.paragraph.rich_text;

      if (richText.length === 0) {
        elementos.push(
          <div key={block.id} className="h-2" />
        );

        i++;
        continue;
      }

      elementos.push(
        <p
          key={block.id}
          className="text-lg leading-8 text-stone-700"
        >
          <RichText richText={richText} />
        </p>
      );

      i++;
      continue;
    }

    /*
     * CITAÇÃO
     */
    if (block.type === "quote") {
      elementos.push(
        <blockquote
          key={block.id}
          className="border-l-4 border-stone-300 pl-5 text-lg italic leading-8 text-stone-600"
        >
          <RichText richText={block.quote.rich_text} />
        </blockquote>
      );

      i++;
      continue;
    }

    /*
     * LISTA COM MARCADORES
     */
    if (block.type === "bulleted_list_item") {
      elementos.push(
        <li
          key={block.id}
          className="ml-6 list-disc text-lg leading-8 text-stone-700"
        >
          <RichText richText={block.bulleted_list_item.rich_text} />
        </li>
      );

      i++;
      continue;
    }

    /*
     * LISTA NUMERADA
     */
    if (block.type === "numbered_list_item") {
      elementos.push(
        <li
          key={block.id}
          className="ml-6 list-decimal text-lg leading-8 text-stone-700"
        >
          <RichText richText={block.numbered_list_item.rich_text} />
        </li>
      );

      i++;
      continue;
    }

    /*
     * HEADING 1
     */
    if (block.type === "heading_1") {
      elementos.push(
        <h2
          key={block.id}
          className="mt-10 text-3xl font-semibold tracking-tight text-stone-900"
        >
          <RichText richText={block.heading_1.rich_text} />
        </h2>
      );

      i++;
      continue;
    }

    /*
     * HEADING 2
     */
    if (block.type === "heading_2") {
      elementos.push(
        <h2
          key={block.id}
          className="mt-10 text-2xl font-semibold tracking-tight text-stone-900"
        >
          <RichText richText={block.heading_2.rich_text} />
        </h2>
      );

      i++;
      continue;
    }

    /*
     * HEADING 3
     */
    if (block.type === "heading_3") {
      elementos.push(
        <h3
          key={block.id}
          className="mt-8 text-xl font-semibold text-stone-900"
        >
          <RichText richText={block.heading_3.rich_text} />
        </h3>
      );

      i++;
      continue;
    }

    i++;
  }

  return <div className="space-y-6">{elementos}</div>;
}