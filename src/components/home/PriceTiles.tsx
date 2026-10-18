import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import { buttonClass, Arrow } from "@/components/ui/Button";
import { formatPrice, priceOf } from "@/lib/content";

const tiles = [
  { label: "Первичная консультация", name: "Прием (осмотр, консультация) врача-стоматолога первичный" },
  { label: "Лечение кариеса", name: "Лечение кариеса" },
  { label: "Профессиональная гигиена", name: "Профессиональная гигиена полости рта и зубов (первичная)" },
  { label: "Базальная имплантация", name: "Базальная имплантация на имплантат Mono implant" },
  { label: "Имплантация", name: "Имплантация" },
  { label: "Брекеты", name: "Исправление прикуса с применением металлических стандартных брекет-систем" },
];

export function PriceTiles() {
  return (
    <section className="section-y bg-ivory">
      <div className="container-x">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-5 !text-brand">Прозрачные цены</p>
            <SplitText text="Цены без сюрпризов" accent={["сюрпризов"]} className="display display-lg" />
          </div>
          <Link href="/prices/" className={buttonClass("dark")}>Весь прайс<Arrow dark={false} /></Link>
        </div>
        <div className="grid gap-px overflow-hidden rounded-[28px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {tiles.map((t, i) => (
            <Reveal key={t.name} delay={(i % 3) * 0.07} className="bg-ivory">
              <Link href="/prices/" className="group relative grid h-full min-h-48 content-between gap-8 p-7 transition-colors duration-500 hover:bg-night hover:text-paper">
                <span className="flex items-start justify-between gap-4 text-sm font-semibold">{t.label}<ArrowUpRight size={18} className="text-gold transition group-hover:rotate-45" /></span>
                <span className="display text-5xl sm:text-6xl">{formatPrice(priceOf(t.name))}</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
