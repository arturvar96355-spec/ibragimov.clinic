import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Media } from "@/components/ui/Media";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";
import { BookButton } from "@/components/features/BookingModal";
import { PageHero } from "@/components/inner/PageHero";
import { Timeline } from "@/components/inner/Timeline";
import { FinalCta } from "@/components/home/FinalCta";
import { Proof } from "@/components/home/Proof";
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
      <PageHero
        crumbs={[{ label: "Врачи", href: "/doctors/" }, { label: d.name }]}
        eyebrow={d.role}
        title={d.name}
        lead={<p>Стаж: {d.experience}. Лечение под микроскопом и современное цифровое оборудование.</p>}
        aside={<Media img={d.photo} tone="night" className="hidden aspect-[4/5] max-w-sm justify-self-end rounded-t-full border border-gold/30 lg:block" />}
      >
        <BookButton context={d.name}>Записаться на прием</BookButton>
      </PageHero>

      <section className="section-y bg-paper">
        <div className="container-x grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
          <Reveal className="grid content-start gap-8">
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-[28px] bg-night p-6 text-paper"><CountUp to={21} className="display text-7xl text-gold" /><p className="mt-1 text-xs text-paper/65">года практики</p></div>
              <div className="rounded-[28px] bg-ivory p-6"><CountUp to={3} className="display text-7xl text-brand" /><p className="mt-1 text-xs text-muted">вида имплантации: базальная, классическая, скуловая</p></div>
            </div>
            <div>
              <h2 className="display display-md mb-5">Основное образование</h2>
              <Timeline items={d.education} />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="display display-md mb-6">Виды лечения</h2>
            <ul className="divide-y divide-line border-y border-line">
              {d.treatments.map((t, i) => (
                <li key={t} className="group flex items-baseline gap-5 py-5 transition-colors hover:bg-white sm:px-3">
                  <span className="display text-3xl italic text-gold">{String(i + 1).padStart(2, "0")}</span>
                  <span className="leading-relaxed transition-transform duration-300 group-hover:translate-x-2">{t}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
      <Proof />
      <FinalCta context={d.name} />
    </>
  );
}
