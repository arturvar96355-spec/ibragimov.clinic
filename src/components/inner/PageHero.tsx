import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/layouts/Breadcrumbs";
import { SplitText } from "@/components/ui/SplitText";

interface PageHeroProps {
  crumbs: { label: string; href?: string }[];
  eyebrow?: string;
  title: string;
  accent?: string[];
  lead?: ReactNode;
  children?: ReactNode;
  aside?: ReactNode;
}

export function PageHero({ crumbs, eyebrow, title, accent, lead, children, aside }: PageHeroProps) {
  return (
    <section className="grain relative isolate overflow-hidden bg-night text-paper">
      <div aria-hidden className="absolute -right-32 -top-20 -z-10 size-[36rem] rounded-full bg-brand/40 blur-[120px]" />
      <svg aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-48 w-full opacity-30" viewBox="0 0 1440 200" preserveAspectRatio="none" fill="none">
        {[0, 1, 2].map((i) => <path key={i} d={`M-40 ${120 + i * 22} C 300 ${40 + i * 24}, 700 ${180 + i * 6}, 1000 ${100 + i * 18} S 1350 ${60 + i * 16}, 1500 ${110 + i * 20}`} stroke="#c9a45c" strokeOpacity={0.55 - i * 0.12} />)}
      </svg>
      <div className="container-x pb-16 pt-32 sm:pt-40 lg:pb-24">
        <Breadcrumbs items={crumbs} />
        <div className={`mt-10 grid gap-10 ${aside ? "lg:grid-cols-[1.3fr_1fr] lg:items-end" : ""}`}>
          <div className="grid gap-6">
            {eyebrow && <p className="eyebrow flex items-center gap-3"><span className="h-px w-10 bg-gold" />{eyebrow}</p>}
            <SplitText as="h1" immediate text={title} accent={accent} className="display display-xl !text-[clamp(2.8rem,7.5vw,6.5rem)] !leading-[0.95]" />
            {lead && <div className="max-w-2xl text-base leading-relaxed text-paper/75 sm:text-lg">{lead}</div>}
            {children && <div className="flex flex-wrap items-center gap-3 pt-2">{children}</div>}
          </div>
          {aside}
        </div>
      </div>
    </section>
  );
}
