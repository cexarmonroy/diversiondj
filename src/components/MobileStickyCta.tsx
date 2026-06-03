import { CtaButton } from "@/components/ui/CtaButton";

export function MobileStickyCta() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-[#030308]/92 px-4 pt-3 backdrop-blur-xl sm:hidden"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
    >
      <CtaButton
        fullWidth
        pulse={false}
        label="Reservar fecha"
        className="!animate-none shadow-[0_-4px_24px_rgba(34,197,94,0.2)]"
      />
    </div>
  );
}
