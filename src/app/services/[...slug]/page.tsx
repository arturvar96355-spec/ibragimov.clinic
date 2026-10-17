import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Media } from "@/components/ui/Media";
import { Breadcrumbs } from "@/components/layouts/Breadcrumbs";
import { BookButton } from "@/components/features/BookingModal";
import { ServiceStickyNav } from "@/components/features/ServiceStickyNav";
import { PriceTable } from "@/components/features/PriceTable";
import { ServiceBlockView } from "@/components/features/ServiceBlocks";
import { Advantages } from "@/components/features/Advantages";
import { DoctorsSection } from "@/components/features/DoctorsSection";
import { EquipmentSlider } from "@/components/features/EquipmentSlider";
import { ReviewsSection } from "@/components/features/ReviewsSection";
import { CtaCallback } from "@/components/features/CtaCallback";
import { ContactsBlock } from "@/components/features/ContactsBlock";
import { getPriceCategory, getService, services } from "@/lib/content";

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

  return (
    <>
      <Breadcrumbs items={[{ label: "Услуги", href: "/services/" }, ...(parent ? [{ label: parent.title, href: `/services/${parent.slug}/` }] : []), { label: s.title }]} />
      <section className="container-x pt-4">
        <div className="grid overflow-hidden rounded-card bg-white shadow-soft lg:min-h-[460px] lg:grid-cols-2">
          <Media img={{ alt: s.title, placeholder: true }} className="min-h-64 lg:min-h-full" />
          <div className="flex flex-col items-start justify-center gap-5 p-7 sm:p-12">
            <h1 className="text-3xl font-bold leading-tight text-brand sm:text-5xl">{s.title}</h1>
            {(s.lead ?? [s.short]).map((p) => <p key={p} className="leading-relaxed">{p}</p>)}
            <BookButton context={s.title}>Записаться</BookButton>
          </div>
        </div>
      </section>

      <div className="container-x">
        {cat && (
          <section id="prices" className="pt-14 lg:pt-20">
            <h2 className="h-section mb-4">Цены</h2>
            <PriceTable category={cat} />
          </section>
        )}
        <section id="description" className="pt-14 lg:pt-20">
          {s.description && (
            <div className="relative rounded-card bg-soft p-6 sm:p-10">
              <h2 className="h-section mb-6">{s.title}</h2>
              <div className="grid gap-4 lg:max-w-[60%]">
                <h3 className="text-xl font-bold">{s.description.title}</h3>
                {s.description.paragraphs.map((p) => <p key={p} className="leading-relaxed">{p}</p>)}
              </div>
              <Media img={{ alt: "", placeholder: true }} tone="sand" className="mt-6 aspect-[4/3] rounded-card lg:absolute lg:-right-4 lg:top-10 lg:mt-0 lg:w-[34%]" />
            </div>
          )}
          {s.blocks?.map((b, i) => <ServiceBlockView key={i} block={b} />)}
        </section>
      </div>

      <Advantages />
      <DoctorsSection />
      <EquipmentSlider />
      <ReviewsSection />
      <div id="booking"><CtaCallback context={s.title} /></div>
      <ContactsBlock />
      <div className="h-20" />
      <ServiceStickyNav />
    </>
  );
}
