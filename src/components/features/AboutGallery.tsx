import { Check } from "lucide-react";
import { Carousel } from "@/components/ui/Carousel";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/content";

const shots = ["Лечение под микроскопом", "Ресепшн клиники", "Лаунж-зона", "Кабинет имплантологии", "3D-принтер NextDent", "Интраоральный сканер"];

export function AboutChecks({ dark = false }: { dark?: boolean }) {
  return (
    <ul className="grid gap-3">
      {site.about.checks.map((c) => (
        <li key={c} className="flex items-center gap-3 font-medium">
          <span className={`grid size-6 shrink-0 place-items-center rounded-full ${dark ? "bg-white text-brand" : "bg-brand text-white"}`}><Check size={14} strokeWidth={3} /></span>{c}
        </li>
      ))}
    </ul>
  );
}

export function AboutGallery() {
  return (
    <section className="container-x section-y" aria-labelledby="about-title">
      <div className="overflow-hidden rounded-card bg-soft p-6 sm:p-10">
        <div className="mb-10 grid gap-8 lg:grid-cols-[1fr_1fr]">
          <Reveal><h2 id="about-title" className="text-4xl font-bold text-[#0b1142] lg:text-5xl">О клинике</h2></Reveal>
          <Reveal delay={0.1} className="grid gap-6"><p className="leading-relaxed">{site.about.text}</p><AboutChecks /></Reveal>
        </div>
        <Carousel
          loop
          slideClass="basis-[85%] sm:basis-1/2 lg:basis-1/3"
          slides={shots.map((s, i) => <Media key={s} img={{ alt: s, placeholder: true }} tone={(["green", "sand", "sky"] as const)[i % 3]} className="aspect-[4/5] rounded-card" />)}
        />
      </div>
    </section>
  );
}
