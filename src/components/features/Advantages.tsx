import { ArrowUpRight, Lightbulb, ShieldCheck, ThumbsUp } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/content";

const icons = { lightbulb: Lightbulb, shield: ShieldCheck, thumbs: ThumbsUp } as const;

export function Advantages() {
  return (
    <section className="container-x section-y" aria-labelledby="adv-title">
      <h2 id="adv-title" className="h-section mb-10 max-w-md">3 причины, почему Ibragimov</h2>
      <div className="grid gap-4 lg:grid-cols-3">
        {site.advantages.map((a, i) => {
          const Icon = icons[a.icon as keyof typeof icons];
          return (
            <Reveal key={a.title} delay={i * 0.1} className="h-full">
              <article className="card group flex h-full flex-col gap-4 p-7 transition duration-300 hover:-translate-y-1 hover:shadow-soft">
                <h3 className="text-xl font-bold text-brand">{a.title}</h3>
                <p className="flex-1 text-sm leading-relaxed text-ink/80">{a.text}</p>
                <div className="flex items-end justify-between pt-4">
                  <span className="grid size-14 place-items-center rounded-2xl bg-brand-soft text-brand transition group-hover:bg-brand group-hover:text-white"><Icon size={28} /></span>
                  <ArrowUpRight className="text-line transition group-hover:text-ink" />
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
