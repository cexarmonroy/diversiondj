const eventTypes = [
  "Matrimonios",
  "Empresas",
  "Eventos privados",
  "Celebraciones",
];

export function HeroSocialProof() {
  return (
    <div className="mt-3 flex w-full max-w-md flex-col items-center gap-2 sm:mt-4 sm:gap-2.5 md:items-start">
      <p className="text-sm font-medium text-zinc-300 sm:text-base">
        <span className="text-green-400">+20 años</span> creando experiencias
        memorables
      </p>

      <p className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 text-xs text-zinc-500 sm:text-sm md:justify-start">
        {eventTypes.map((type, i) => (
          <span key={type} className="inline-flex items-center gap-1.5">
            {i > 0 && (
              <span className="text-purple-500/60" aria-hidden>
                •
              </span>
            )}
            {type}
          </span>
        ))}
      </p>
    </div>
  );
}
