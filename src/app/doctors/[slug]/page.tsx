import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Media } from "@/components/ui/Media";
import { Accordion } from "@/components/ui/Accordion";
import { Breadcrumbs } from "@/components/layouts/Breadcrumbs";
import { BookButton } from "@/components/features/BookingModal";
import { ReviewsSection } from "@/components/features/ReviewsSection";
import { CtaCallback } from "@/components/features/CtaCallback";
import { doctors } from "@/lib/content";

export const generateStaticParams = () => doctors.map((d) => ({ slug: d.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const d = doctors.find((x) => x.slug === slug);
  return d ? { title: `${d.name} — ${d.role.toLowerCase()}, Ibragimov Clinic`, description: `${d.name}, ${d.role.toLowerCase()}, стаж ${d.experience}. Запись на прием в Москве.` } : {};
}

export default async function DoctorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = doctors.find((x) => x.slug === slug);
  if (!d) notFound();
  return (
    <>
      <Breadcrumbs items={[{ label: "Врачи", href: "/doctors/" }, { label: d.name }]} />
      <section className="container-x pt-4">
        <div className="grid overflow-hidden rounded-card bg-white shadow-soft lg:grid-cols-2">
          <Media img={d.photo} tone="sand" className="aspect-[4/3] lg:aspect-auto lg:min-h-[480px]" priority />
          <div className="flex flex-col items-start justify-center gap-5 p-7 sm:p-12">
            <h1 className="text-3xl font-bold leading-tight text-brand sm:text-4xl">{d.name}</h1>
            <p className="w-full border-y border-line py-3"><b>Стаж:</b> {d.experience}</p>
            <p className="w-full border-b border-line pb-3">{d.role}.</p>
            <BookButton context={d.name}>Записаться на прием</BookButton>
          </div>
        </div>
      </section>
      <section className="container-x py-14 lg:py-20">
        <h2 className="h-section mb-6">Информация</h2>
        <Accordion
          defaultOpen="treatments"
          items={[
            { id: "treatments", head: <b>Виды лечения</b>, body: <ul className="grid gap-3">{d.treatments.map((t) => <li key={t} className="flex gap-3"><span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" />{t}</li>)}</ul> },
            { id: "education", head: <b>Основное образование</b>, body: <ol className="grid gap-4">{d.education.map((e, i) => <li key={e} className="flex items-start gap-4"><span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand text-xs font-bold text-white">{String(i + 1).padStart(2, "0")}</span><p className="pt-2">{e}</p></li>)}</ol> },
          ]}
        />
      </section>
      <ReviewsSection />
      <CtaCallback context={d.name} />
    </>
  );
}
