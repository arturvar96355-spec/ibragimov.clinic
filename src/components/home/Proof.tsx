import { Star } from "lucide-react";
import { CountUp } from "@/components/ui/CountUp";
import { Marquee } from "@/components/ui/Marquee";
import { SplitText } from "@/components/ui/SplitText";
import { reviews, site } from "@/lib/content";

const sourceName = { yandex: "Яндекс", "2gis": "2ГИС", zoon: "Zoon" } as const;

export function Proof() {
  return (
    <section className="grain relative overflow-hidden bg-forest text-paper section-y">
      <div className="container-x relative">
        <p className="eyebrow mb-5">Доверие</p>
        <SplitText text="Пациенты оценивают нас на 4,8" accent={["4,8"]} className="display display-lg mb-14 max-w-4xl" />
        <div className="grid gap-4 sm:grid-cols-3">
          {site.ratings.map((r) => (
            <a key={r.id} href={r.url} target="_blank" rel="noopener noreferrer" className="group glass grid gap-2 rounded-[28px] p-7 transition duration-500 hover:-translate-y-1 hover:bg-paper/10">
              <p className="display text-7xl text-gold"><CountUp to={parseFloat(r.value)} decimals={r.value.includes(".") ? 1 : 0} /><span className="text-3xl text-paper/50"> / 5</span></p>
              <p className="flex items-center justify-between text-sm"><span>Рейтинг на {r.name}</span><span className="flex text-gold">{Array.from({ length: 5 }, (_, i) => <Star key={i} size={14} fill="currentColor" />)}</span></p>
            </a>
          ))}
        </div>
      </div>
      <Marquee className="mt-14" >
        {reviews.map((r) => (
          <figure key={r.date + r.source} className="w-[22rem] shrink-0 rounded-[28px] bg-paper p-6 text-ink">
            <div className="mb-3 flex items-center justify-between text-xs"><span className="rounded-full bg-ivory px-3 py-1 font-bold text-brand">{sourceName[r.source]}</span><span className="text-muted">{r.date}</span></div>
            <div className="mb-3 flex text-gold">{Array.from({ length: r.rating }, (_, i) => <Star key={i} size={14} fill="currentColor" />)}</div>
            <blockquote className="mb-4 text-sm leading-relaxed">{r.text}</blockquote>
            <figcaption className="text-sm font-bold">{r.author}</figcaption>
          </figure>
        ))}
      </Marquee>
    </section>
  );
}
