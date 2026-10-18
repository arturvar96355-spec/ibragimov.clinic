import type { Metadata } from "next";
import { FileCheck } from "lucide-react";
import { Check } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Media } from "@/components/ui/Media";
import { PageHero } from "@/components/inner/PageHero";
import { Reasons } from "@/components/inner/Reasons";
import { DoctorChapter } from "@/components/home/DoctorChapter";
import { EquipmentBento } from "@/components/home/EquipmentBento";
import { FinalCta } from "@/components/home/FinalCta";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "О клинике Ibragimov Clinic — центр базальной имплантации в Москве",
  description: "Международный центр базальной имплантации доктора Ибрагимова: опытные врачи, лечение под микроскопом, современное оборудование.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero crumbs={[{ label: "О клинике" }]} eyebrow="Ibragimov Clinic" title={site.brandFull} accent={["базальной"]} lead={<p>{site.about.text}</p>} />
      <section className="section-y bg-paper">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal><Media img={{ alt: "Ресепшн клиники", placeholder: true }} tone="ivory" className="aspect-[4/5] rounded-t-full border border-gold/40" /></Reveal>
          <Reveal delay={0.1} className="grid gap-8">
            <h2 className="display display-md">Наш подход</h2>
            <ul className="grid gap-5">
              {site.about.checks.map((c) => (
                <li key={c} className="flex items-center gap-5 border-b border-line pb-5 text-lg font-semibold"><span className="grid size-10 shrink-0 place-items-center rounded-full bg-night text-gold"><Check size={18} strokeWidth={3} /></span>{c}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
      <Reasons dark />
      <DoctorChapter />
      <EquipmentBento />
      <section className="section-y bg-ivory">
        <div className="container-x grid items-center gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div className="grid aspect-[3/4] max-w-xs place-items-center rounded-[32px] border border-gold/50 bg-white p-6 shadow-soft">
            <div className="grid place-items-center gap-3 text-center text-muted"><FileCheck size={48} className="text-brand" /><p className="text-sm">Скан лицензии клиники<br />(будет добавлен из материалов заказчика)</p></div>
          </div>
          <div className="grid gap-5"><h2 className="display display-md">Лицензия клиники</h2><p className="max-w-xl leading-relaxed text-muted">{site.license}</p></div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
