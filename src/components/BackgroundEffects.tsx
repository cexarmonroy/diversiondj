export function BackgroundEffects() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="noise-overlay absolute inset-0" />

      <div
        className="absolute -left-32 top-0 h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[120px]"
        style={{ animation: "gradient-shift 8s ease-in-out infinite" }}
      />
      <div
        className="absolute -right-24 top-1/3 h-[400px] w-[400px] rounded-full bg-cyan-500/15 blur-[100px]"
        style={{ animation: "gradient-shift 10s ease-in-out infinite 2s" }}
      />
      <div
        className="absolute bottom-0 left-1/2 h-[350px] w-[600px] -translate-x-1/2 rounded-full bg-pink-600/10 blur-[100px]"
        style={{ animation: "gradient-shift 12s ease-in-out infinite 4s" }}
      />

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}

export function EqualizerBars() {
  const bars = [0.4, 0.7, 1, 0.6, 0.9, 0.5, 0.8, 0.65, 0.95, 0.55, 0.75, 0.45];

  return (
    <div className="flex h-8 items-end justify-center gap-[3px] opacity-60" aria-hidden>
      {bars.map((delay, i) => (
        <span
          key={i}
          className="w-[3px] rounded-full bg-gradient-to-t from-purple-500 to-cyan-400"
          style={{
            animation: `equalizer ${0.8 + delay}s ease-in-out infinite`,
            animationDelay: `${i * 0.08}s`,
          }}
        />
      ))}
    </div>
  );
}
