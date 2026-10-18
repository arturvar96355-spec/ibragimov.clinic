import Link from "next/link";

export function Breadcrumbs({ items, light = true }: { items: { label: string; href?: string }[]; light?: boolean }) {
  const all = [{ label: "Главная", href: "/" }, ...items];
  return (
    <nav aria-label="Хлебные крошки" className={`text-[11px] ${light ? "text-paper/60" : "text-muted"}`}>
      <ol className="flex flex-wrap items-center gap-2">
        {all.map((it, i) => (
          <li key={it.label} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden className="size-1 rounded-full bg-gold" />}
            {it.href && i < all.length - 1 ? <Link href={it.href} className="transition hover:text-gold">{it.label}</Link> : <span aria-current="page" className={light ? "text-paper" : "text-ink"}>{it.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
