import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { childrenOf, featuredPrice, formatPrice, rootServices } from "@/lib/content";

export function ServicesIndex() {
  return (
    <section className="section-y bg-paper">
      <div className="container-x">
        <p className="eyebrow mb-10 !text-brand">Все направления</p>
        <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {rootServices.map((s, i) => {
            const min = featuredPrice(s);
            const kids = childrenOf(s.slug);
            const dark = i % 4 === 0 || i % 4 === 3;
            return (
              <li key={s.slug} className="h-full list-none">
                <Reveal delay={(i % 3) * 0.07} className="h-full">
                  <article className={`group relative flex h-full min-h-[22rem] flex-col justify-between gap-8 overflow-hidden rounded-[32px] p-7 transition duration-500 hover:-translate-y-1 ${dark ? "bg-night text-paper" : "border border-line bg-white"}`}>
                    <div aria-hidden className="absolute -right-12 -top-12 size-52 rounded-full bg-gold/15 blur-2xl transition duration-500 group-hover:scale-150" />
                    <div className="relative flex items-start justify-between">
                      <span className="display text-6xl italic text-gold">{String(i + 1).padStart(2, "0")}</span>
                      <span className={`grid size-11 place-items-center rounded-full transition duration-500 group-hover:rotate-45 group-hover:bg-gold group-hover:text-night ${dark ? "bg-paper/10" : "bg-ivory"}`}><ArrowUpRight size={18} /></span>
                    </div>
                    <div className="relative grid gap-3">
                      <h2 className="display text-3xl sm:text-4xl"><Link href={`/services/${s.slug}/`} className="after:absolute after:inset-0">{s.title}</Link></h2>
                      <p className={`text-sm ${dark ? "text-paper/65" : "text-muted"}`}>{s.short}</p>
                      {kids.length > 0 && <ul className="relative z-10 flex flex-wrap gap-1.5">{kids.map((c) => <li key={c.slug}><Link href={`/services/${c.slug}/`} className={`block rounded-full px-3 py-1 text-[11px] transition hover:bg-gold hover:text-night ${dark ? "bg-paper/10" : "bg-ivory"}`}>{c.title}</Link></li>)}</ul>}
                      {min && <p className="text-sm font-bold text-gold">{formatPrice(min)}</p>}
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
