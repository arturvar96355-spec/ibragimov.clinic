import { ButtonLink } from "@/components/ui/Button";
import { Media } from "@/components/ui/Media";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/content";

export function IntroBlock() {
  return (
    <section className="container-x section-y relative">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-10 -z-10 h-64 opacity-60">
        <svg viewBox="0 0 1200 260" className="h-full w-full" fill="none" preserveAspectRatio="none"><path d="M0 180C200 80 360 240 600 140S1000 60 1200 150" stroke="#c9a45c" strokeOpacity=".5" /><path d="M0 210C220 110 380 270 620 170S1020 90 1200 180" stroke="#c9a45c" strokeOpacity=".35" /></svg>
      </div>
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <Reveal className="grid gap-6">
          <h2 className="h-section lg:text-5xl lg:leading-[1.1]">{site.intro.title}</h2>
          <p className="max-w-lg text-lg leading-relaxed">{site.intro.text}</p>
          <div><ButtonLink href="/about/">Подробнее</ButtonLink></div>
        </Reveal>
        <Reveal delay={0.1}>
          <Media img={{ alt: "Врач с бинокулярной лупой", placeholder: true }} tone="sand" className="aspect-[4/3] rounded-card shadow-soft" />
        </Reveal>
      </div>
    </section>
  );
}
