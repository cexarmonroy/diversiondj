import { aboutParagraphs } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ui } from "@/lib/ui";

export function AboutSection() {
  return (
    <section id="sobre-mi" className="scroll-mt-20">
      <SectionHeading icon="🎤">Sobre Diversión DJ</SectionHeading>
      <div className={`space-y-4 ${ui.bodyText}`}>
        {aboutParagraphs.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
