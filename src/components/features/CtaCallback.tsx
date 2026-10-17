import { LeadForm } from "./LeadForm";
import { Reveal } from "@/components/ui/Reveal";

export function CtaCallback({ context }: { context?: string }) {
  return (
    <section className="container-x pb-14 lg:pb-24" aria-labelledby="cta-title">
      <Reveal>
        <div className="relative overflow-hidden rounded-card bg-cta px-5 py-12 text-center sm:py-16">
          <div aria-hidden className="absolute -left-20 -top-20 size-72 rounded-full bg-brand/10 blur-2xl" />
          <div aria-hidden className="absolute -bottom-24 -right-10 size-80 rounded-full bg-gold/20 blur-3xl" />
          <h2 id="cta-title" className="relative mb-2 text-3xl font-medium sm:text-4xl">Мы вам перезвоним</h2>
          <p className="relative mb-8 text-sm text-muted">Оставьте номер, и администратор свяжется с вами в удобное время</p>
          <div className="relative mx-auto max-w-72"><LeadForm context={context} /></div>
        </div>
      </Reveal>
    </section>
  );
}
