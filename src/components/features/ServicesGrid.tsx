import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Media } from "@/components/ui/Media";
import { SectionHead } from "./SectionHead";
import { Reveal } from "@/components/ui/Reveal";
import { childrenOf, rootServices } from "@/lib/content";

export function ServicesGrid() {
  const half = Math.ceil(rootServices.length / 2);
  const cols = [rootServices.slice(0, half), rootServices.slice(half)];
  return (
    <section className="bg-soft py-14 lg:py-20" aria-labelledby="services-title">
      <div className="container-x">
        <SectionHead id="services-title" title="Услуги" href="/services/" />
        <div className="grid gap-4 lg:grid-cols-2">
          {cols.map((col, ci) => (
            <div key={ci} className="grid content-start gap-4">
              {col.map((s, i) => (
                <Reveal key={s.slug} delay={i * 0.05}>
                  <div className="group relative rounded-card bg-white p-5 transition duration-300 hover:-translate-y-0.5 hover:shadow-soft">
                    <Link href={`/services/${s.slug}/`} className="flex items-center gap-4 after:absolute after:inset-0 after:content-['']">
                      <Media img={{ alt: "" }} tone={i % 2 ? "sand" : "green"} className="size-[60px] shrink-0 rounded-ctl" />
                      <span>
                        <span className="block text-base font-bold leading-snug">{s.title}</span>
                        {s.priceFrom && <span className="mt-0.5 block text-xs font-semibold text-brand">{s.priceFrom}</span>}
                      </span>
                      <ArrowUpRight className="ml-auto shrink-0 text-line transition group-hover:text-ink" />
                    </Link>
                    {childrenOf(s.slug).length > 0 && (
                      <ul className="relative z-10 mt-4 grid gap-1 border-t border-line/60 pt-3">
                        {childrenOf(s.slug).map((c) => (
                          <li key={c.slug}><Link href={`/services/${c.slug}/`} className="flex items-center justify-between rounded-lg px-2 py-1.5 text-sm text-muted transition hover:bg-brand-soft hover:text-brand">{c.title}<ArrowUpRight size={14} /></Link></li>
                        ))}
                      </ul>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
