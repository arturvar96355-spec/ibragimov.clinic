import { Box, Cog, Cpu, Glasses, Microscope, ScanLine, Sun, Syringe, Waves, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import { equipment } from "@/lib/content";

const icons: LucideIcon[] = [Microscope, Box, Glasses, Cog, Syringe, Cpu, Waves, Sun, ScanLine];
const spans = [
  "sm:col-span-2 lg:col-span-2 lg:row-span-2",
  "lg:col-span-2",
  "",
  "",
  "",
  "",
  "lg:col-span-2",
  "",
  "sm:col-span-2 lg:col-span-2",
];

export function EquipmentBento() {
  return (
    <section className="section-y bg-paper">
      <div className="container-x">
        <p className="eyebrow mb-5 !text-brand">Оборудование</p>
        <SplitText text="Технологии, которые работают на точность" accent={["точность"]} className="display display-lg mb-12 max-w-4xl" />
        <div className="grid auto-rows-[minmax(14rem,auto)] gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {equipment.map((e, i) => {
            const Icon = icons[i];
            const big = i === 0;
            const dark = i % 3 === 0;
            return (
              <Reveal key={e.title} delay={(i % 4) * 0.06} className={spans[i]}>
                <article className={`group relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-[28px] p-6 transition duration-500 hover:-translate-y-1 sm:p-7 ${dark ? "bg-night text-paper" : "border border-line bg-white"}`}>
                  <div aria-hidden className="absolute -right-10 -top-10 size-44 rounded-full bg-gold/15 blur-2xl transition duration-500 group-hover:scale-150" />
                  <span className={`relative grid size-12 place-items-center rounded-2xl ${dark ? "bg-paper/10 text-gold" : "bg-ivory text-brand"}`}><Icon size={24} strokeWidth={1.6} /></span>
                  <div className="relative grid gap-3">
                    <h3 className={`display ${big ? "text-4xl sm:text-5xl" : "text-2xl sm:text-3xl"}`}>{e.title}</h3>
                    <p className={`text-sm leading-relaxed ${dark ? "text-paper/65" : "text-muted"} ${big ? "" : "line-clamp-4"}`}>{e.text}</p>
                    {e.list && <ul className="flex flex-wrap gap-1.5">{e.list.slice(0, big ? 8 : 3).map((l) => <li key={l} className={`rounded-full px-3 py-1 text-[11px] ${dark ? "bg-paper/10" : "bg-ivory"}`}>{l}</li>)}</ul>}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
