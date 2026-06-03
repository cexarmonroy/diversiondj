import { musicStyles } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";

const styleIcons: Record<string, string> = {
  "Open Format": "🎵",
  Reggaetón: "🔥",
  "Hits actuales": "📻",
  "Dance / Electrónica": "💃",
  "Pop & Rock": "🎸",
  "Clásicos 80s / 90s / 2000s": "📼",
  "Sets personalizados": "✨",
};

export function MusicStylesSection() {
  return (
    <section>
      <SectionHeading icon="🎶">Estilos musicales</SectionHeading>
      <div className="flex flex-wrap gap-2 sm:gap-2.5">
        {musicStyles.map((style) => (
          <span
            key={style}
            className="inline-flex max-w-full items-center gap-1.5 rounded-full border border-purple-500/20 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 px-3 py-2 text-xs font-medium text-zinc-200 transition-all hover:border-purple-400/40 hover:from-purple-500/20 hover:to-cyan-500/20 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)] sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm"
          >
            <span aria-hidden>{styleIcons[style] ?? "🎵"}</span>
            <span className="break-words">{style}</span>
          </span>
        ))}
      </div>
    </section>
  );
}
