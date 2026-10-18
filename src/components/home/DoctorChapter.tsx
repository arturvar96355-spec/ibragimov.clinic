import Link from "next/link";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { CountUp } from "@/components/ui/CountUp";
import { SplitText } from "@/components/ui/SplitText";
import { ButtonLink } from "@/components/ui/Button";
import { doctors } from "@/lib/content";

export function DoctorChapter() {
  const d = doctors[0];
  return (
    <section className="section-y overflow-hidden bg-ivory">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal className="relative mx-auto w-full max-w-md">
          <div aria-hidden className="absolute -inset-4 rounded-t-full border border-gold/50" />
          <Media img={d.photo} tone="night" className="aspect-[3/4] rounded-t-full" sizes="(min-width:1024px) 440px, 90vw" />
          <div className="absolute -right-3 bottom-10 grid size-28 place-items-center rounded-full bg-gold text-center text-night shadow-soft sm:-right-8 sm:size-32">
            <div><CountUp to={21} className="display text-5xl" /><p className="-mt-1 text-[10px] font-bold uppercase tracking-wider">год практики</p></div>
          </div>
        </Reveal>
        <div className="grid gap-6">
          <p className="eyebrow !text-brand">Главный врач</p>
          <SplitText text={d.name} className="display display-lg" />
          <p className="text-lg text-muted">{d.role}</p>
          <ol className="divide-y divide-line border-y border-line">
            {d.treatments.slice(0, 5).map((t, i) => (
              <li key={t} className="group flex items-baseline gap-5 py-4 transition-colors hover:bg-white/60">
                <span className="eyebrow !text-brand w-7 !text-[10px]">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-sm leading-relaxed transition-transform duration-300 group-hover:translate-x-2">{t}</span>
              </li>
            ))}
          </ol>
          <div className="flex flex-wrap gap-3"><ButtonLink href={`/doctors/${d.slug}/`} variant="dark">О враче</ButtonLink><Link href="/doctors/" className="self-center text-sm font-bold underline decoration-gold underline-offset-4">Все врачи</Link></div>
        </div>
      </div>
    </section>
  );
}
