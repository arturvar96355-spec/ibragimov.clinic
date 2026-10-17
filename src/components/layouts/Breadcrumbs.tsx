import Link from "next/link";

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  const all = [{ label: "Главная", href: "/" }, ...items];
  return (
    <nav aria-label="Хлебные крошки" className="container-x pt-28 text-[11px] text-muted sm:pt-32">
      <ol className="flex flex-wrap items-center gap-2">
        {all.map((it, i) => (
          <li key={it.label} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden className="size-1 rounded-full bg-brand" />}
            {it.href && i < all.length - 1 ? <Link href={it.href} className="transition hover:text-brand">{it.label}</Link> : <span aria-current="page">{it.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
