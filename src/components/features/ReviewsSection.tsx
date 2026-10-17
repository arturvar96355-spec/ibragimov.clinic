import { ArrowUpRight, Star } from "lucide-react";
import { Carousel } from "@/components/ui/Carousel";
import { reviews, site } from "@/lib/content";

const sourceName = { yandex: "Яндекс", "2gis": "2ГИС", zoon: "Zoon" } as const;

export function ReviewsSection() {
  return (
    <section className="container-x pb-14 lg:pb-24" aria-labelledby="reviews-title">
      <div className="grid gap-4 rounded-card bg-soft p-6 sm:p-10 lg:grid-cols-[1.6fr_1fr]">
        <div className="min-w-0">
          <h2 id="reviews-title" className="h-section mb-8">Отзывы</h2>
          <Carousel
            slideClass="basis-full sm:basis-1/2"
            slides={reviews.map((r) => (
              <article key={r.date + r.source} className="flex h-full flex-col gap-3 rounded-card bg-white p-5">
                <div className="flex items-center justify-between text-xs">
                  <span className="rounded-full bg-brand-soft px-2.5 py-1 font-bold text-brand">{sourceName[r.source]}</span>
                  <span className="text-muted">{r.date}</span>
                </div>
                <div className="flex gap-0.5 text-[#e0b53b]" aria-label={`Оценка ${r.rating} из 5`}>{Array.from({ length: r.rating }).map((_, i) => <Star key={i} size={16} fill="currentColor" />)}</div>
                <p className="flex-1 text-sm leading-relaxed">{r.text}</p>
                <div className="flex items-center justify-between"><b className="text-sm">{r.author}</b><ArrowUpRight size={18} className="text-line" /></div>
              </article>
            ))}
          />
        </div>
        <aside className="flex flex-col gap-6 rounded-card bg-brand p-7 text-white">
          <h3 className="text-lg font-bold leading-snug">Независимые рейтинги</h3>
          <p className="text-sm text-white/80">Изучите мнение о нас на независимых авторитетных интернет-ресурсах.</p>
          <ul className="grid gap-4">
            {site.ratings.map((r) => (
              <li key={r.id}>
                <a href={r.url} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3">
                  <span className="grid size-12 shrink-0 place-items-center rounded-full bg-white text-xs font-black text-brand ring-4 ring-white/25 transition group-hover:ring-white/50">{r.name.slice(0, 2)}</span>
                  <span className="text-sm">Рейтинг на {r.name}:<br /><b className="text-lg">{r.value} из 5</b></span>
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
