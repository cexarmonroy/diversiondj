import Link from "next/link";
import { BookingForm } from "@/components/BookingForm";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { siteConfig } from "@/lib/config";
import { ui } from "@/lib/ui";

export const metadata = {
  title: `Reserva tu evento | ${siteConfig.brand}`,
  description:
    "Solicita tu fecha con Diversión DJ. Matrimonios, fiestas de empresa y eventos privados en Santiago.",
};

export default function ReservaPage() {
  return (
    <main className={`mx-auto w-full max-w-2xl ${ui.pageX} py-10 ${ui.stickyOffset} sm:pb-10`}>
      <Link
        href="/"
        className="mb-6 inline-block text-sm text-zinc-400 transition-colors hover:text-white"
      >
        ← Volver al inicio
      </Link>

      <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">Reserva</p>
      <h1 className="font-[family-name:var(--font-syne)] text-3xl font-bold text-white sm:text-4xl">
        Reserva tu evento
      </h1>
      <p className={`mt-3 ${ui.bodyText}`}>
        Completa el formulario y te responderé en menos de 24 horas.
      </p>

      <div className="glass-card mt-8 rounded-3xl p-5 sm:p-8">
        <BookingForm />
        <div className="mt-4">
          <WhatsAppButton />
        </div>
      </div>
    </main>
  );
}
