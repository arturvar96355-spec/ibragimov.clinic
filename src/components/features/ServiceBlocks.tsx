import { Fragment, type ReactNode } from "react";
import type { ServiceBlock } from "@/lib/types";

/** **жирный** внутри абзацев контента */
export function rich(text: string): ReactNode {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) => (i % 2 ? <b key={i}>{part}</b> : <Fragment key={i}>{part}</Fragment>));
}

export function ServiceBlockView({ block }: { block: ServiceBlock }) {
  switch (block.type) {
    case "timeline":
      return (
        <section className="my-10 rounded-card bg-sky p-6 sm:p-10">
          <h2 className="h-section mb-8">{block.title}</h2>
          <ol className="relative grid gap-6">
            {block.items?.map((it, i) => (
              <li key={it} className="relative flex items-start gap-5">
                <span className="relative z-10 grid size-12 shrink-0 place-items-center rounded-full bg-brand text-sm font-bold text-white">{String(i + 1).padStart(2, "0")}</span>
                {i < (block.items?.length ?? 0) - 1 && <span aria-hidden className="absolute left-6 top-12 h-[calc(100%+0.5rem)] border-l border-dashed border-brand/40" />}
                <p className="pt-3 font-bold">{it}</p>
              </li>
            ))}
          </ol>
        </section>
      );
    case "qualities":
    case "rich-text":
      return (
        <section className="my-10">
          {block.title && <h2 className="h-section mb-4">{block.title}</h2>}
          <div className="grid max-w-3xl gap-4 leading-relaxed">{block.paragraphs?.map((p) => <p key={p}>{rich(p)}</p>)}</div>
        </section>
      );
    case "seo-text":
      return <section className="my-10 grid max-w-3xl gap-4 text-sm leading-relaxed text-ink/80">{block.paragraphs?.map((p) => <p key={p}>{rich(p)}</p>)}</section>;
  }
}
