import { formatPrice } from "@/lib/content";
import type { PriceCategory } from "@/lib/types";

export function PriceTable({ category }: { category: PriceCategory }) {
  return (
    <ul className="divide-y divide-line/60">
      {category.items.map((it) => (
        <li key={it.name} className="flex items-baseline justify-between gap-6 py-4">
          <span className="font-semibold">{it.name}</span>
          <span className="shrink-0 text-xl font-bold text-brand">{formatPrice(it.price)}</span>
        </li>
      ))}
    </ul>
  );
}
