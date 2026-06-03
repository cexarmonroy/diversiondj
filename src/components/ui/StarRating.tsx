export function StarRating() {
  return (
    <div className="flex gap-0.5 text-amber-400" aria-label="5 estrellas">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className="text-sm drop-shadow-[0_0_6px_rgba(251,191,36,0.5)]">
          ★
        </span>
      ))}
    </div>
  );
}
