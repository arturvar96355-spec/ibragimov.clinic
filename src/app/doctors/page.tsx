import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/layouts/Breadcrumbs";
import { DoctorCard } from "@/components/features/DoctorsSection";
import { IntroBlock } from "@/components/features/IntroBlock";
import { ReviewsSection } from "@/components/features/ReviewsSection";
import { CtaCallback } from "@/components/features/CtaCallback";
import { doctors } from "@/lib/content";

export const metadata: Metadata = {
  title: "Врачи-стоматологи Ibragimov Clinic в Москве",
  description: "Врачи клиники Ibragimov Clinic: стоматолог-имплантолог Ибрагимов Ибрагим Гусейнович, стаж 21 год.",
};

export default function DoctorsPage() {
  const specs = ["Все", ...new Set(doctors.flatMap((d) => d.specs))];
  return (
    <>
      <Breadcrumbs items={[{ label: "Врачи" }]} />
      <section className="container-x py-8 lg:py-12">
        <h1 className="h-section mb-6 lg:text-5xl">Врачи</h1>
        <div className="mb-8 flex flex-wrap gap-2">
          {specs.map((s, i) => <span key={s} className={`rounded-full border px-4 py-2 text-sm font-medium ${i === 0 ? "border-brand bg-brand text-white" : "border-line"}`}>{s}</span>)}
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{doctors.map((d) => <DoctorCard key={d.slug} d={d} />)}</div>
      </section>
      <IntroBlock />
      <ReviewsSection />
      <CtaCallback />
    </>
  );
}
