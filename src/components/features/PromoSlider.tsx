import { Media } from "@/components/ui/Media";
import { BookButton } from "./BookingModal";
import { promos } from "@/lib/content";

export function PromoHero() {
  const p = promos[0];
  return (
    <section className="container-x pt-24 sm:pt-28" aria-label="Акция">
      <div className="grid overflow-hidden rounded-card bg-white shadow-soft lg:min-h-[520px] lg:grid-cols-2">
        <Media img={{ alt: "Врач у монитора КТ", placeholder: true }} className="min-h-64 lg:min-h-full" tone="green" priority />
        <div className="flex flex-col items-start justify-center gap-6 p-7 sm:p-12">
          <span className="rounded-ctl border border-brand px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-brand">{p.badge}</span>
          <h1 className="text-3xl font-bold leading-[1.1] sm:text-5xl">{p.title}</h1>
          <p className="text-xs text-muted">{p.note}</p>
          <BookButton context={p.title}>Записаться</BookButton>
        </div>
      </div>
    </section>
  );
}
