import { MapPin, MessageCircle } from "lucide-react";
import { LeadForm } from "@/components/features/LeadForm";
import { MapStub } from "@/components/features/MapStub";
import { SplitText } from "@/components/ui/SplitText";
import { Reveal } from "@/components/ui/Reveal";
import { site } from "@/lib/content";

export function FinalCta({ context }: { context?: string }) {
  return (
    <section id="contacts" className="grain cv relative overflow-hidden bg-night text-paper section-y">
      <div aria-hidden className="absolute -left-40 -top-40 size-[44rem] rounded-full bg-[radial-gradient(closest-side,rgba(29,104,93,0.64),transparent)]" />
      <div className="container-x relative">
        <p className="eyebrow mb-5">Запись на консультацию</p>
        <SplitText text="Первый шаг к улыбке — одна заявка" accent={["улыбке"]} className="display display-lg mb-14 max-w-5xl" />
        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="grid gap-8">
            <div className="glass rounded-[32px] p-6 sm:p-9">
              <p className="mb-5 text-sm text-paper/70">Оставьте номер — администратор перезвонит и подберет удобное время.</p>
              <LeadForm context={context} tone="dark" />
            </div>
            <dl className="grid gap-5 text-sm sm:grid-cols-2">
              <div><dt className="eyebrow mb-2">Телефон</dt><dd><a href={site.phoneHref} className="display text-3xl">{site.phoneDisplay}</a></dd></div>
              <div><dt className="eyebrow mb-2">Почта</dt><dd><a href={`mailto:${site.email}`} className="break-all">{site.email}</a></dd></div>
              <div><dt className="eyebrow mb-2">Адрес</dt><dd className="leading-relaxed">{site.addressCity}<br />{site.address}<br /><span className="text-paper/60">{site.addressNote}</span></dd></div>
              <div><dt className="eyebrow mb-2">Время работы</dt><dd>{site.hoursDays}: {site.hours}<p className="mt-2 flex items-center gap-2 text-paper/60"><MapPin size={14} />м. {site.metro.join(", ")}</p></dd></div>
            </dl>
            <div className="flex gap-3">
              <a href={site.social.vk} className="glass rounded-full px-5 py-3 text-sm font-bold transition hover:bg-gold hover:text-night">ВКонтакте</a>
              <a href={site.social.whatsapp} className="glass flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold transition hover:bg-gold hover:text-night"><MessageCircle size={16} />WhatsApp</a>
            </div>
          </Reveal>
          <Reveal delay={0.1}><MapStub className="min-h-[16rem] sm:min-h-[24rem] lg:h-full" /></Reveal>
        </div>
      </div>
    </section>
  );
}
