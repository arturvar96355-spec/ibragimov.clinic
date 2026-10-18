import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="grain relative grid min-h-[100svh] place-items-center bg-night px-5 text-center text-paper">
      <div className="grid gap-6">
        <p className="eyebrow">Ошибка 404</p>
        <h1 className="display display-xl">Страница <span className="italic text-gold">не найдена</span></h1>
        <p className="mx-auto max-w-md text-paper/70">Возможно, адрес изменился. Вернитесь на главную или выберите нужную услугу.</p>
        <div className="flex flex-wrap justify-center gap-3"><ButtonLink href="/">На главную</ButtonLink><ButtonLink href="/services/" variant="ghost">Услуги</ButtonLink></div>
      </div>
    </section>
  );
}
