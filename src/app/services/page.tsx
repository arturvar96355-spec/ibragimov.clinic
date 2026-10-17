import type { Metadata } from "next";
import Link from "next/link";
import { Accordion } from "@/components/ui/Accordion";
import { Media } from "@/components/ui/Media";
import { Breadcrumbs } from "@/components/layouts/Breadcrumbs";
import { ReviewsSection } from "@/components/features/ReviewsSection";
import { CtaCallback } from "@/components/features/CtaCallback";
import { childrenOf, rootServices } from "@/lib/content";

export const metadata: Metadata = {
  title: "Услуги стоматологии в Москве — Ibragimov Clinic",
  description: "Имплантация, базальная имплантация, ортодонтия, лечение зубов, пародонтология и протезирование в ЮЗАО Москвы.",
};

export default function ServicesPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Услуги" }]} />
      <section className="container-x py-8 lg:py-12">
        <h1 className="h-section mb-6 lg:text-5xl">Услуги</h1>
        <div className="mb-8 flex flex-wrap gap-2">
          {rootServices.map((s) => <a key={s.slug} href={`#${s.slug}`} className="rounded-full border border-line px-4 py-2 text-sm font-medium transition hover:border-brand hover:bg-brand hover:text-white">{s.title}</a>)}
        </div>
        <Accordion
          items={rootServices.map((s, i) => {
            const kids = childrenOf(s.slug);
            return {
              id: s.slug,
              head: (
                <span className="flex items-center gap-4">
                  <Media img={{ alt: "" }} tone={i % 2 ? "sand" : "green"} className="size-[60px] shrink-0 rounded-ctl" />
                  <span><b className="block text-base">{s.title}</b><span className="text-xs text-muted">{s.short}</span></span>
                </span>
              ),
              body: (
                <ul className="grid gap-1 pl-1 sm:pl-[76px]">
                  <li><Link href={`/services/${s.slug}/`} className="inline-block rounded-ctl bg-brand px-4 py-2 text-sm font-bold text-white transition hover:bg-brand-dark">Подробнее об услуге</Link></li>
                  {kids.map((c) => <li key={c.slug}><Link href={`/services/${c.slug}/`} className="block py-1.5 text-sm transition hover:text-brand">{c.title}</Link></li>)}
                </ul>
              ),
            };
          })}
        />
      </section>
      <ReviewsSection />
      <CtaCallback />
    </>
  );
}
