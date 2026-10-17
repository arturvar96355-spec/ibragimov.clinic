import type { Metadata } from "next";
import { Media } from "@/components/ui/Media";
import { Breadcrumbs } from "@/components/layouts/Breadcrumbs";
import { BookButton } from "@/components/features/BookingModal";
import { CtaCallback } from "@/components/features/CtaCallback";
import { promos } from "@/lib/content";

export const metadata: Metadata = {
  title: "Акции и специальные предложения — Ibragimov Clinic",
  description: "Актуальные акции стоматологии Ibragimov Clinic в Москве.",
};

export default function PromoPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Акции" }]} />
      <section className="container-x py-8 lg:py-12">
        <h1 className="h-section mb-8 lg:text-5xl">Акции</h1>
        <div className="grid gap-4 md:grid-cols-2">
          {promos.map((p) => (
            <article key={p.id} className="overflow-hidden rounded-card bg-white shadow-soft">
              <Media img={{ alt: p.title, placeholder: true }} className="aspect-[16/9]" />
              <div className="grid gap-4 p-7">
                <span className="w-fit rounded-ctl border border-brand px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand">{p.badge}</span>
                <h2 className="text-2xl font-bold">{p.title}</h2>
                <p className="text-xs text-muted">{p.note}</p>
                <div><BookButton context={p.title}>Записаться</BookButton></div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <CtaCallback />
    </>
  );
}
