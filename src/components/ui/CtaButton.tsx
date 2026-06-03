import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { ui } from "@/lib/ui";

type CtaButtonProps = {
  label?: string;
  className?: string;
  fullWidth?: boolean;
  pulse?: boolean;
  href?: string;
};

function CalendarIcon() {
  return (
    <svg
      className="h-[18px] w-[18px] shrink-0 text-white"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

export function CtaButton({
  label = "¡Reserva tu fecha ahora!",
  className = "",
  fullWidth = false,
  pulse = true,
  href = siteConfig.bookingUrl,
}: CtaButtonProps) {
  return (
    <Link
      href={href}
      className={`group ${ui.actionButton} border border-green-500/40 bg-gradient-to-r from-green-600 to-emerald-500 text-white shadow-[0_0_28px_rgba(34,197,94,0.35)] hover:scale-[1.02] hover:border-green-400/60 hover:from-green-500 hover:to-emerald-400 hover:shadow-[0_0_36px_rgba(34,197,94,0.45)] ${pulse ? "animate-pulse-glow" : ""} ${fullWidth ? "w-full" : "w-full sm:w-auto sm:min-w-[220px] sm:max-w-[280px]"} ${className}`}
    >
      <CalendarIcon />
      <span className="truncate">{label}</span>
    </Link>
  );
}

export function GhostButton({
  href,
  label,
  className = "",
}: {
  href: string;
  label: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`${ui.actionButton} border border-white/10 bg-white/[0.04] text-zinc-200 hover:border-purple-500/40 hover:bg-white/[0.08] hover:text-white sm:w-auto sm:min-w-[160px] ${className}`}
    >
      {label}
    </Link>
  );
}
