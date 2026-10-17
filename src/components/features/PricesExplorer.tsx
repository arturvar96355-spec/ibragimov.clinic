"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Accordion } from "@/components/ui/Accordion";
import { Media } from "@/components/ui/Media";
import { PriceTable } from "./PriceTable";
import { prices } from "@/lib/content";

export function PricesExplorer() {
  const [q, setQ] = useState("");
  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return prices;
    return prices.map((c) => ({ ...c, items: c.items.filter((i) => i.name.toLowerCase().includes(s) || c.title.toLowerCase().includes(s)) })).filter((c) => c.items.length);
  }, [q]);

  return (
    <>
      <div className="mb-6 flex max-w-xl overflow-hidden rounded-ctl border border-line bg-white focus-within:border-brand">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Найти услугу" aria-label="Найти услугу" className="min-w-0 flex-1 px-4 py-3.5 text-sm outline-none" />
        <span className="grid w-12 place-items-center bg-ink text-white"><Search size={18} /></span>
      </div>
      <div className="mb-8 flex flex-wrap gap-2">
        {prices.map((c) => <a key={c.id} href={`#${c.id}`} className="rounded-full border border-line px-4 py-2 text-sm font-medium transition hover:border-brand hover:bg-brand hover:text-white">{c.title}</a>)}
      </div>
      {list.length ? (
        <Accordion
          key={q ? "filtered" : "all"}
          defaultOpen={q ? list[0].id : "consultation"}
          items={list.map((c, i) => ({
            id: c.id,
            head: <span className="flex items-center gap-4"><Media img={{ alt: "" }} tone={i % 2 ? "sand" : "green"} className="size-[60px] shrink-0 rounded-ctl" /><b>{c.title}</b></span>,
            body: <PriceTable category={c} />,
          }))}
        />
      ) : <p className="rounded-card bg-soft p-8 text-center text-muted">По запросу «{q}» ничего не найдено</p>}
    </>
  );
}
