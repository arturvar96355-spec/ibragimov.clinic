import Link from "next/link";

export function SectionHead({ title, href, linkLabel, id }: { title: string; href?: string; linkLabel?: string; id?: string }) {
  return (
    <div className="mb-8 flex items-end justify-between gap-4">
      <h2 id={id} className="h-section">{title}</h2>
      {href && <Link href={href} className="shrink-0 rounded-ctl border border-brand bg-white px-4 py-2 text-xs font-medium text-brand transition hover:bg-brand hover:text-white">{linkLabel ?? "Показать все"}</Link>}
    </div>
  );
}
