import { Fragment, type ReactNode } from "react";

/** **жирный** внутри абзацев контента */
export function rich(text: string): ReactNode {
  return text.split(/\*\*(.+?)\*\*/g).map((part, i) => (i % 2 ? <b key={i} className="font-bold text-ink">{part}</b> : <Fragment key={i}>{part}</Fragment>));
}
