import { MapPin, MessageCircle } from "lucide-react";
import { site } from "@/lib/content";
import { MapStub } from "./MapStub";

export function ContactsBlock() {
  return (
    <section className="container-x section-y" id="contacts" aria-labelledby="contacts-title">
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-card bg-brand p-7 text-white sm:p-10">
          <h2 id="contacts-title" className="mb-8 text-3xl font-bold">Контакты</h2>
          <dl className="grid gap-x-6 gap-y-6 text-sm sm:grid-cols-2">
            <div><dt className="mb-1 text-xs italic text-white/65">Контактный номер</dt><dd><a href={site.phoneHref} className="text-lg font-bold">{site.phoneDisplay}</a></dd></div>
            <div><dt className="mb-1 text-xs italic text-white/65">Электронная почта</dt><dd><a href={`mailto:${site.email}`} className="break-all font-bold">{site.email}</a></dd></div>
            <div className="sm:col-span-1"><dt className="mb-1 text-xs italic text-white/65">Адрес</dt><dd className="font-bold leading-snug">{site.address}<br />{site.addressCity}<br /><span className="font-normal text-white/80">{site.addressNote}</span></dd></div>
            <div>
              <dt className="mb-2 text-xs italic text-white/65">Соцсети</dt>
              <dd className="flex gap-2">
                <a href={site.social.vk} aria-label="ВКонтакте" className="grid size-11 place-items-center rounded-full bg-white text-brand transition hover:scale-105"><span className="text-sm font-black">VK</span></a>
                <a href={site.social.whatsapp} aria-label="WhatsApp" className="grid size-11 place-items-center rounded-full bg-white text-brand transition hover:scale-105"><MessageCircle size={20} /></a>
              </dd>
            </div>
          </dl>
          <p className="mt-8 flex items-center gap-2 text-xs text-white/80"><MapPin size={14} /> м. {site.metro.join(", ")}</p>
        </div>
        <MapStub className="min-h-72 lg:min-h-full" />
      </div>
    </section>
  );
}

