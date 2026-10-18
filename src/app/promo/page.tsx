import type { Metadata } from "next";
import { Reveal } from "@/components/ui/Reveal";
import { BookButton } from "@/components/features/BookingModal";
import { PageHero } from "@/components/inner/PageHero";
import { FinalCta } from "@/components/home/FinalCta";
import { promos } from "@/lib/content";

export const metadata: Metadata = {
  title: "Акции и специальные предложения — Ibragimov Clinic",
  description: "Актуальные акции стоматологии Ibragimov Clinic в Москве.",
};

export default function PromoPage() {
  return (
    <>
      <PageHero crumbs={[{ label: "Акции" }]} eyebrow="Предложения" title="Акции клиники" accent={["клиники"]} />
      <section className="section-y bg-paper">
        <div className="container-x grid gap-4">
          {promos.map((p) => (
            <Reveal key={p.id}>
              <article className="grain relative grid gap-8 overflow-hidden rounded-[40px] bg-forest p-8 text-paper sm:p-14 lg:grid-cols-[1.4fr_1fr] lg:items-end">
                <div aria-hidden className="absolute -right-16 -top-16 size-80 rounded-full bg-gold/25 blur-3xl" />
                <div className="relative grid gap-5">
                  <span className="eyebrow w-fit rounded-full border border-gold/50 px-4 py-1.5">{p.badge}</span>
                  <h2 className="display display-lg">{p.title}</h2>
                  <p className="text-xs text-paper/60">{p.note}</p>
                </div>
                <div className="relative lg:justify-self-end"><BookButton context={p.title}>Записаться</BookButton></div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
      <FinalCta />
    </>
  );
}
