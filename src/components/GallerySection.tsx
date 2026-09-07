"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/lib/config";

const clips = [
  {
    webm: "/videos/live-1.webm",
    mp4: "/videos/live-1.mp4",
    poster: "/images/live-1-poster.jpg",
    alt: "Pista llena bailando durante un evento musicalizado por Diversión DJ",
  },
  {
    webm: "/videos/live-2.webm",
    mp4: "/videos/live-2.mp4",
    poster: "/images/live-2-poster.jpg",
    alt: "Invitados con las manos arriba en la pista de baile",
  },
  {
    webm: "/videos/live-3.webm",
    mp4: "/videos/live-3.mp4",
    poster: "/images/live-3-poster.jpg",
    alt: "Celebración con confeti y energía en la pista",
  },
];

function LiveClip({ webm, mp4, poster, alt }: (typeof clips)[number]) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative aspect-[9/16] overflow-hidden rounded-2xl border border-zinc-700/80 bg-zinc-900">
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        controls={false}
        aria-label={alt}
      >
        <source src={webm} type="video/webm" />
        <source src={mp4} type="video/mp4" />
      </video>
    </div>
  );
}

export function GallerySection() {
  return (
    <section>
      <SectionHeading icon="🎥">En vivo</SectionHeading>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <div className="relative aspect-[9/16] overflow-hidden rounded-2xl border border-zinc-700/80">
          <Image
            src="/images/gallery-booth.jpg"
            alt="Cabina de DJ con la pista de baile llena de invitados al fondo"
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 200px"
          />
        </div>

        {clips.map((clip) => (
          <LiveClip key={clip.mp4} {...clip} />
        ))}
      </div>

      <p className="mt-3 text-xs text-zinc-500 sm:text-sm">
        Momentos reales de eventos musicalizados por {siteConfig.brand}.
      </p>
    </section>
  );
}
