import { BookingForm } from "@/components/BookingForm";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { ui } from "@/lib/ui";

export function BookingSection() {
  return (
    <section id="reserva" className="scroll-mt-20">
      <div className="glass-card relative overflow-hidden rounded-2xl p-5 sm:rounded-3xl sm:p-8">
        <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-purple-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-cyan-500/15 blur-3xl" />

        <SectionHeading icon="📋">Reserva tu evento</SectionHeading>

        <p className={ui.bodyText}>
          Completa el formulario y te responderé en menos de 24 horas.
        </p>

        <p className="mt-3 flex items-start gap-2 text-xs text-amber-400/90 sm:text-sm">
          <span className="mt-0.5 shrink-0" aria-hidden>
            👉
          </span>
          <span>Fechas limitadas — agenda 2026 cerrándose rápido</span>
        </p>

        <BookingForm />

        <div className="mt-4">
          <WhatsAppButton />
        </div>
      </div>
    </section>
  );
}
