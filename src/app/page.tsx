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
          <div className="order-1 flex flex-col gap-10 sm:gap-12 lg:order-1">
            <div className="order-1 lg:order-4">
              <GallerySection />
            </div>
            <div className="order-2 lg:order-1">
              <AboutSection />
            </div>
            <div className="order-3 lg:order-2">
              <ExperienceSection />
            </div>
            <div className="order-4 lg:order-3">
              <MusicStylesSection />
            </div>
          </div>

          <aside className="order-2 flex flex-col gap-8 lg:order-2 lg:sticky lg:top-6 lg:self-start">
            <div className="order-1 lg:order-2">
              <TestimonialsSection />
            </div>
            <div className="order-2 lg:order-1">
              <BookingSection />
            </div>
          </aside>
        </div>
      </main>

      <Footer />

      <MobileStickyCta />
    </>
  );
}
