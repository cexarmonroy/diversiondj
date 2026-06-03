import Link from "next/link";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { BookingsTable } from "@/components/admin/BookingsTable";
import { getBookingStats, listBookings } from "@/lib/bookings";
import { isAdminAuthenticated } from "@/lib/auth";
import { isSupabaseConfigured } from "@/lib/supabase/server";
import { ui } from "@/lib/ui";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const authed = await isAdminAuthenticated();
  const supabaseReady = isSupabaseConfigured();

  let bookings = null;
  let stats = null;
  let loadError = "";

  if (authed && supabaseReady) {
    try {
      [bookings, stats] = await Promise.all([
        listBookings(),
        getBookingStats(),
      ]);
    } catch (error) {
      loadError =
        error instanceof Error
          ? error.message
          : "No se pudieron cargar las reservas.";
    }
  }

  return (
    <main
      className={`mx-auto min-h-screen w-full max-w-5xl ${ui.pageX} py-10 ${ui.stickyOffset} sm:pb-10`}
    >
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
            Panel interno
          </p>
          <h1 className="font-[family-name:var(--font-syne)] text-3xl font-bold text-white">
            Reservas
          </h1>
        </div>

        <Link
          href="/"
          className="text-sm text-zinc-400 transition-colors hover:text-white"
        >
          ← Volver al sitio
        </Link>
      </div>

      {!supabaseReady ? (
        <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5 text-sm text-amber-200">
          Configura Supabase en `.env.local`: `NEXT_PUBLIC_SUPABASE_URL` y
          `SUPABASE_SERVICE_ROLE_KEY`. Luego ejecuta el SQL en{" "}
          <code className="text-amber-100">supabase/schema.sql</code>.
        </div>
      ) : authed ? (
        loadError ? (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-5 text-sm text-red-200">
            {loadError}
          </div>
        ) : (
          <BookingsTable bookings={bookings ?? []} stats={stats ?? { total: 0, pending: 0 }} />
        )
      ) : (
        <div className="mx-auto max-w-md rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <p className={`mb-6 ${ui.bodyText}`}>
            Accede para ver y gestionar las solicitudes de reserva recibidas.
          </p>
          <AdminLogin />
        </div>
      )}
    </main>
  );
}
