import Link from "next/link";
import { Logo } from "./Logo";
import { VisionToggle } from "./VisionToggle";
import { rootServices, site } from "@/lib/content";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="grain relative overflow-hidden bg-night pb-28 pt-20 text-paper md:pb-10">
      <div className="container-x relative z-10">
        <div className="grid gap-12 border-b border-paper/15 pb-14 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div className="grid content-start gap-5">
            <Logo />
            <p className="max-w-sm text-sm leading-relaxed text-paper/60">{site.brandFull}. Стоматология в Москве, ЮЗАО.</p>
          </div>
          <div>
            <p className="eyebrow mb-5">Услуги</p>
            <ul className="grid gap-2.5 text-sm">
              {rootServices.slice(0, 7).map((s) => <li key={s.slug}><Link href={`/services/${s.slug}/`} className="text-paper/75 transition hover:text-gold">{s.title}</Link></li>)}
            </ul>
          </div>
          <div className="grid content-start gap-3 text-sm">
            <p className="eyebrow mb-2">Контакты</p>
            <a href={site.phoneHref} className="display text-3xl">{site.phoneDisplay}</a>
            <a href={`mailto:${site.email}`} className="text-paper/75 transition hover:text-gold">{site.email}</a>
            <p className="text-paper/60">{site.addressCity}<br />{site.address}, {site.addressNote}</p>
            <p className="text-paper/60">{site.hoursDays}: {site.hours}</p>
          </div>
        </div>
        <div className="flex flex-col gap-4 py-8 text-xs text-paper/60 lg:flex-row lg:items-center lg:justify-between">
          <span>{year} © Ibragimov clinic</span>
          <Link href="/privacy/" className="transition hover:text-gold">Политика конфиденциальности</Link>
          <div className="flex gap-4"><a href={site.social.vk} className="transition hover:text-gold">ВКонтакте</a><a href={site.social.whatsapp} className="transition hover:text-gold">WhatsApp</a></div>
          <VisionToggle />
        </div>
        <p className="text-xs font-semibold text-paper/85">Имеются противопоказания, необходима консультация специалиста.</p>
        <p className="mt-2 max-w-4xl text-[11px] leading-relaxed text-paper/45">
          *Обращаем Ваше внимание на то, что данный интернет-сайт носит исключительно информационный характер и ни при каких условиях не является публичной офертой, определяемой положениями Статьи 437 Гражданского кодекса Российской Федерации.
        </p>
        <p className="mt-2 text-[11px] text-paper/40">Демонстрационная версия сайта. Фото, отзывы и часть данных — временные.</p>
      </div>
      <p aria-hidden className="display pointer-events-none mt-6 select-none whitespace-nowrap text-center text-[clamp(4rem,19vw,19rem)] leading-[0.8] text-transparent [-webkit-text-stroke:1px_rgba(201,164,92,0.35)]">Ibragimov</p>
    </footer>
  );
}
