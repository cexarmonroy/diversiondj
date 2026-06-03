import { experienceItems } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ExperienceSection() {
  return (
    <section>
      <SectionHeading icon="🎉">Experiencia en eventos</SectionHeading>
      <ul className="grid grid-cols-1 gap-2.5 md:grid-cols-2">
        {experienceItems.map((item) => (
          <li
            key={item}
            className="flex min-h-12 items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 transition-colors hover:border-green-500/20 hover:bg-green-500/[0.04]"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-500/15 text-xs text-green-400">
              ✓
            </span>
            <span className="text-sm text-zinc-200 sm:text-base">{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
