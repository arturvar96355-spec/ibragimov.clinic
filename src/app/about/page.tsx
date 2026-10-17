import type { Metadata } from "next";
import { FileCheck } from "lucide-react";
import { Media } from "@/components/ui/Media";
import { Breadcrumbs } from "@/components/layouts/Breadcrumbs";
import { AboutChecks } from "@/components/features/AboutGallery";
import { Advantages } from "@/components/features/Advantages";
import { DoctorsSection } from "@/components/features/DoctorsSection";
import { ReviewsSection } from "@/components/features/ReviewsSection";
import { CtaCallback } from "@/components/features/CtaCallback";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "О клинике Ibragimov Clinic — центр базальной имплантации в Москве",
  description: "Международный центр базальной имплантации доктора Ибрагимова: опытные врачи, лечение под микроскопом, современное оборудование.",
};

export default function AboutPage() {
  return (
    <>
      <Breadcrumbs items={[{ label: "О клинике" }]} />
      <section className="container-x pt-4">
        <div className="grid items-center gap-8 rounded-card border border-line/60 p-6 sm:p-10 lg:grid-cols-2">
          <div className="grid gap-6">
            <h1 className="text-3xl font-bold leading-tight text-brand sm:text-4xl">{site.brandFull}</h1>
            <p className="leading-relaxed">{site.about.text}</p>
            <AboutChecks />
          </div>
          <Media img={{ alt: "Ресепшн клиники", placeholder: true }} tone="sand" className="aspect-[4/3] rounded-card" />
        </div>
      </section>
      <section className="container-x section-y">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div className="grid aspect-[3/4] max-w-xs place-items-center rounded-card bg-white p-6 shadow-soft">
            <div className="grid place-items-center gap-3 text-center text-muted"><FileCheck size={48} className="text-brand" /><p className="text-sm">Скан лицензии клиники<br />(будет добавлен из материалов заказчика)</p></div>
          </div>
          <div className="grid gap-4"><h2 className="h-section">Лицензия клиники</h2><p className="leading-relaxed">{site.license}</p></div>
        </div>
      </section>
      <Advantages />
      <DoctorsSection />
      <ReviewsSection />
      <CtaCallback />
    </>
  );
}
