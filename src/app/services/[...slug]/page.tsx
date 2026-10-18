import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { BookButton } from "@/components/features/BookingModal";
import { PageHero } from "@/components/inner/PageHero";
import { ServiceRail } from "@/components/inner/ServiceRail";
import { Timeline } from "@/components/inner/Timeline";
import { rich } from "@/components/inner/RichText";
import { Reasons } from "@/components/inner/Reasons";
import { FinalCta } from "@/components/home/FinalCta";
import { childrenOf, featuredPrice, formatPrice, getPriceCategory, getService, services } from "@/lib/content";

type Params = { slug: string[] };

export const generateStaticParams = () => services.map((s) => ({ slug: s.slug.split("/") }));

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const s = getService((await params).slug.join("/"));
  return s ? { title: s.seo.title, description: s.seo.description } : {};
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const s = getService((await params).slug.join("/"));
  if (!s) notFound();
  const parent = s.parent ? getService(s.parent) : undefined;
  const cat = getPriceCategory(s.priceCategory);
  const kids = childrenOf(s.slug);
  const min = featuredPrice(s);
  const timeline = s.blocks?.find((b) => b.type === "timeline");
  const related = (parent ? childrenOf(parent.slug).filter((c) => c.slug !== s.slug) : kids);

  const rail = [
    ...(cat ? [{ id: "prices", label: "Цены" }] : []),
    { id: "about", label: "Описание" },
    ...(timeline ? [{ id: "indications", label: timeline.title?.split(" ").slice(0, 2).join(" ") ?? "Показания" }] : []),
    { id: "booking", label: "Запись" },
  ];

  return (
    <>
      <PageHero
        crumbs={[{ label: "Услуги", href: "/services/" }, ...(parent ? [{ label: parent.title, href: `/services/${parent.slug}/` }] : []), { label: s.title }]}
        eyebrow={parent ? parent.title : "Услуга клиники"}
        title={s.title}
        lead={<div className="grid gap-3">{(s.lead ?? [s.short]).map((p) => <p key={p}>{p}</p>)}</div>}
        aside={<Media img={{ alt: s.title, placeholder: true }} tone="night" className="hidden aspect-[4/3] rounded-[40px] border border-gold/30 lg:block" />}
      >
        <BookButton context={s.title}>Записаться</BookButton>
        {min && <span className="glass rounded-full px-5 py-3 text-sm"><span className="text-paper/60">Стоимость </span><b className="text-gold">{formatPrice(min)}</b></span>}
      </PageHero>

      <div className="container-x section-y grid gap-12 lg:grid-cols-[15rem_1fr] lg:gap-20">
        <ServiceRail items={rail} context={s.title} />
        <div className="grid min-w-0 gap-20">
          {cat && (
            <section id="prices" aria-labelledby="prices-h">
              <h2 id="prices-h" className="display display-md mb-8">Цены</h2>
              <div className="grid gap-px overflow-hidden rounded-[28px] border border-line bg-line sm:grid-cols-2">
                {cat.items.map((i) => (
                  <div key={i.name} className="grid content-between gap-6 bg-white p-6 transition-colors duration-500 hover:bg-night hover:text-paper">
                    <p className="text-sm font-semibold">{i.name}</p>
                    <p className="display text-4xl text-brand sm:text-5xl">{formatPrice(i.price)}</p>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-muted">Указаны стартовые цены. Точная стоимость определяется после осмотра и диагностики.</p>
            </section>
          )}

          <section id="about" aria-labelledby="about-h" className="grid gap-8">
            <h2 id="about-h" className="display display-md">{s.description?.title ?? s.title}</h2>
            <div className="grid max-w-3xl gap-4 text-base leading-relaxed text-ink/85">
              {(s.description?.paragraphs ?? s.lead ?? []).map((p) => <p key={p}>{rich(p)}</p>)}
            </div>
            {s.blocks?.filter((b) => b.type === "qualities" || b.type === "rich-text").map((b) => (
              <Reveal key={b.title}>
                <div className="grain relative overflow-hidden rounded-[32px] bg-night p-7 text-paper sm:p-10">
                  <div aria-hidden className="absolute -right-10 -top-10 size-48 rounded-full bg-[radial-gradient(closest-side,rgba(201,164,92,0.32),transparent)]" />
                  <p className="eyebrow mb-3">Особенность</p>
                  <h3 className="display display-md mb-4">{b.title}</h3>
                  <div className="grid max-w-2xl gap-3 leading-relaxed text-paper/80">{b.paragraphs?.map((p) => <p key={p}>{p.replace(/\*\*/g, "")}</p>)}</div>
                </div>
              </Reveal>
            ))}
          </section>

          {timeline && (
            <section id="indications" aria-labelledby="ind-h">
              <h2 id="ind-h" className="display display-md mb-10">{timeline.title}</h2>
              <Timeline items={timeline.items ?? []} />
            </section>
          )}

          {s.blocks?.filter((b) => b.type === "seo-text").map((b, i) => (
            <div key={i} className="grid max-w-3xl gap-4 border-t border-line pt-10 text-sm leading-relaxed text-muted">{b.paragraphs?.map((p) => <p key={p}>{rich(p)}</p>)}</div>
          ))}

          {related.length > 0 && (
            <section aria-labelledby="rel-h">
              <h2 id="rel-h" className="display display-md mb-6">{parent ? "Другие направления раздела" : "Подуслуги"}</h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {related.map((c) => (
                  <li key={c.slug}><Link href={`/services/${c.slug}/`} className="group flex items-center justify-between gap-4 rounded-[24px] border border-line bg-white p-5 transition hover:border-night hover:bg-night hover:text-paper"><span className="display text-2xl">{c.title}</span><ArrowUpRight className="shrink-0 text-gold transition group-hover:rotate-45" /></Link></li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>

      <Reasons />
      <div id="booking"><FinalCta context={s.title} /></div>
    </>
  );
}
