import { testimonials } from "@/lib/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StarRating } from "@/components/ui/StarRating";
import { ui } from "@/lib/ui";

export function TestimonialsSection() {
  return (
    <section>
      <SectionHeading icon="💬">Lo que dicen mis clientes</SectionHeading>
      <div className="space-y-4">
        {testimonials.map((t, i) => (
          <blockquote
            key={i}
            className="glass-card rounded-2xl p-4 transition-all duration-300 sm:p-5"
          >
            <StarRating />
            <p className={`mt-3 italic ${ui.bodyText}`}>
              &ldquo;{t.quote}&rdquo;
            </p>
            <footer className="mt-3 text-xs font-medium text-zinc-500 sm:text-sm">
              — {t.event}
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
