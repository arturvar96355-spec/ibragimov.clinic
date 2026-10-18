import { Reveal } from "@/components/ui/Reveal";
import { SplitText } from "@/components/ui/SplitText";
import { site } from "@/lib/content";

export function Reasons({ dark = false }: { dark?: boolean }) {
  return (
    <section className={`section-y ${dark ? "bg-night text-paper" : "bg-ivory"}`}>
      <div className="container-x">
        <p className={`eyebrow mb-5 ${dark ? "" : "!text-brand"}`}>Почему Ibragimov</p>
        <SplitText text="Три причины выбрать нашу клинику" accent={["причины"]} className="display display-lg mb-14 max-w-4xl" />
        <div className={`grid divide-y lg:grid-cols-3 lg:divide-x lg:divide-y-0 ${dark ? "divide-paper/15" : "divide-line"}`}>
          {site.advantages.map((a, i) => (
            <Reveal key={a.title} delay={i * 0.1}>
              <article className="grid h-full content-start gap-5 py-8 lg:px-8 lg:py-2 lg:first:pl-0 lg:last:pr-0">
                <span className="display text-7xl italic text-gold">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="display text-4xl">{a.title}</h3>
                <p className={`text-sm leading-relaxed ${dark ? "text-paper/70" : "text-muted"}`}>{a.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
