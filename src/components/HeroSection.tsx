import Image from "next/image";
import { HeroSocialProof } from "@/components/HeroSocialProof";
import { siteConfig } from "@/lib/config";
import { CtaButton, GhostButton } from "@/components/ui/CtaButton";
import { EqualizerBars } from "@/components/BackgroundEffects";

export function HeroSection() {
  return (
    <section className="relative pb-12 pt-6 sm:pb-16 sm:pt-10">
      <div className="flex flex-col items-center gap-8 sm:gap-10 md:flex-row md:items-center md:gap-12 lg:gap-14">
        <div className="relative shrink-0 animate-float">
          <div className="absolute -inset-1 animate-spin-slow rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 opacity-75 blur-sm" />
          <div className="relative h-40 w-40 overflow-hidden rounded-full border border-zinc-700/80 sm:h-48 sm:w-48 md:h-52 md:w-52 lg:h-56 lg:w-56">
            <Image
              src="/images/profile-avatar.png"
              alt={`${siteConfig.name} — ${siteConfig.brand} en evento`}
              fill
              className="object-cover object-center"
              priority
              sizes="(max-width: 640px) 160px, (max-width: 1024px) 192px, 224px"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 flex h-9 w-9 items-center justify-center rounded-full bg-black/80 text-base backdrop-blur-sm sm:h-10 sm:w-10 sm:text-lg">
            🎧
          </div>
        </div>

        <div className="flex w-full min-w-0 flex-col items-center text-center md:items-start md:text-left">
          <div className="mb-2 h-[3px] w-16 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 sm:w-20" />

          <p className="mb-1 font-[family-name:var(--font-syne)] text-xs font-medium uppercase tracking-[0.2em] text-zinc-400 sm:text-sm sm:tracking-[0.25em]">
            Press Kit
          </p>

          <h1 className="font-[family-name:var(--font-syne)] text-[2rem] font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            <span className="block text-white">{siteConfig.name}</span>
            <span className="gradient-text animate-shimmer mt-1 block bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400">
              {siteConfig.brand}
            </span>
          </h1>

          <p className="mt-3 max-w-md text-sm text-zinc-400 sm:mt-4 sm:text-lg">
            {siteConfig.tagline} en eventos y fiestas
          </p>

          <HeroSocialProof />

          <div className="mt-6 flex w-full max-w-md flex-col gap-3 sm:max-w-none sm:flex-row sm:flex-wrap md:justify-start">
            <CtaButton label="¡Reserva tu fecha ahora!" pulse={false} />
            <GhostButton href="#sobre-mi" label="Conoce más" />
          </div>

          <div className="mt-6 w-full max-w-[220px] sm:mt-8 sm:max-w-xs">
            <EqualizerBars />
          </div>
        </div>
      </div>
    </section>
  );
}
