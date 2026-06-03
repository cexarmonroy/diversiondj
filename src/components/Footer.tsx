import { siteConfig } from "@/lib/config";
import { ui } from "@/lib/ui";

export function Footer() {
  return (
    <footer
      className={`border-t border-white/5 py-10 ${ui.pageX} pb-[calc(6rem+env(safe-area-inset-bottom,0px))] sm:pb-10`}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <p className="font-[family-name:var(--font-syne)] text-lg font-bold text-white">
            {siteConfig.brand}
          </p>
          <p className="mt-1 text-sm text-zinc-500">
            Disponibilidad limitada por fechas
          </p>
        </div>

        <div className="flex flex-col items-center gap-3 sm:items-end">
          <a
            href={siteConfig.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-pink-400"
          >
            <span className="text-base" aria-hidden>
              📸
            </span>
            {siteConfig.instagramHandle}
          </a>
          <p className="flex items-center gap-2 text-sm text-zinc-500">
            <span aria-hidden>📍</span>
            {siteConfig.location}
          </p>
        </div>
      </div>

      <p className="mx-auto mt-8 max-w-6xl text-center text-xs leading-relaxed text-zinc-600">
        © {new Date().getFullYear()} {siteConfig.name} · {siteConfig.brand}. Todos
        los derechos reservados.
      </p>
    </footer>
  );
}
