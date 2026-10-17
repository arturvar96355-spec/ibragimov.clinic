import Link from "next/link";
import { Calendar, Mail, MapPin } from "lucide-react";
import { Logo } from "./Logo";
import { VisionToggle } from "./VisionToggle";
import { rootServices, site } from "@/lib/content";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="container-x pb-6">
      <div className="overflow-hidden rounded-card bg-soft">
        <div className="grid gap-10 p-7 sm:p-10 lg:grid-cols-2">
          <div>
            <h2 className="mb-5 text-2xl font-bold text-brand">Услуги</h2>
            <ul className="grid gap-x-8 gap-y-2.5 text-sm sm:grid-cols-2">
              {rootServices.map((s) => <li key={s.slug}><Link href={`/services/${s.slug}/`} className="transition hover:text-brand">{s.title}</Link></li>)}
            </ul>
            <Link href="/services/" className="mt-5 inline-block rounded-ctl border border-brand px-4 py-2 text-xs text-brand transition hover:bg-brand hover:text-white">Показать все</Link>
          </div>
          <div className="grid gap-4 text-sm">
            <h2 className="text-2xl font-bold text-brand">Контакты</h2>
            <p className="flex items-center gap-2"><Calendar size={16} className="text-brand" /><i>{site.hoursDays}:</i> <b>{site.hours}</b></p>
            <a href={site.phoneHref} className="text-3xl font-bold text-[#0b1142]">{site.phoneDisplay}</a>
            <a href={`mailto:${site.email}`} className="flex items-center gap-2"><Mail size={16} className="text-brand" />{site.email}</a>
            <p className="flex items-start gap-2"><MapPin size={16} className="mt-0.5 shrink-0 text-brand" />{site.addressCity}, {site.address}</p>
          </div>
        </div>
        <div className="flex flex-col gap-4 bg-gradient-to-b from-[#ececec] to-[#e2e2e2] p-6 text-xs sm:px-10 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4"><Logo /><span className="text-muted">{year} © Ibragimov clinic</span></div>
          <Link href="/privacy/" className="transition hover:text-brand">Политика конфиденциальности</Link>
          <div className="flex items-center gap-2">Мы в соц.сетях:
            <a href={site.social.vk} aria-label="ВКонтакте" className="grid size-8 place-items-center rounded-full bg-white text-[10px] font-black text-brand">VK</a>
            <a href={site.social.whatsapp} aria-label="WhatsApp" className="grid size-8 place-items-center rounded-full bg-white text-[10px] font-black text-brand">WA</a>
          </div>
          <VisionToggle />
        </div>
      </div>
      <p className="mt-5 text-center text-xs font-semibold text-ink/80">Имеются противопоказания, необходима консультация специалиста.</p>
      <p className="mx-auto mt-2 max-w-4xl text-center text-[11px] leading-relaxed text-muted">
        *Обращаем Ваше внимание на то, что данный интернет-сайт носит исключительно информационный характер и ни при каких условиях не является публичной офертой, определяемой положениями Статьи 437 Гражданского кодекса Российской Федерации.
      </p>
      <p className="mt-3 text-center text-[11px] text-muted">Демонстрационная версия сайта. Фото, отзывы и часть данных — временные.</p>
    </footer>
  );
}
