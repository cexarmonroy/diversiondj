import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { MusicStylesSection } from "@/components/MusicStylesSection";
import { GallerySection } from "@/components/GallerySection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { BookingSection } from "@/components/BookingSection";
import { Footer } from "@/components/Footer";
import { MobileStickyCta } from "@/components/MobileStickyCta";
import { ui } from "@/lib/ui";

export default function Home() {
  return (
    <>
      <main
        className={`relative mx-auto w-full max-w-6xl ${ui.pageX} pt-4 ${ui.stickyOffset}`}
      >
        <HeroSection />

        <div className="mt-10 grid gap-10 sm:mt-12 sm:gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(280px,380px)] lg:gap-14">
          <div className={`order-2 lg:order-1 ${ui.sectionGap}`}>
            <AboutSection />
            <ExperienceSection />
            <MusicStylesSection />
            <GallerySection />
          </div>

          <aside className="order-1 space-y-8 lg:order-2 lg:sticky lg:top-6 lg:self-start">
            <BookingSection />
            <TestimonialsSection />
          </aside>
        </div>
      </main>

      <Footer />

      <MobileStickyCta />
    </>
  );
}
