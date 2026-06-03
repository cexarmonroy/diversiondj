"use client";

import { useTransition } from "react";
import type { Booking, BookingStatus } from "@/lib/booking-types";
import { BOOKING_STATUSES, STATUS_LABELS } from "@/lib/booking-types";
import { changeBookingStatus, logoutAdmin } from "@/app/actions/booking";

type BookingsTableProps = {
  bookings: Booking[];
  stats: { total: number; pending: number };
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("es-CL", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function BookingsTable({ bookings, stats }: BookingsTableProps) {
  const [pending, startTransition] = useTransition();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-3 text-sm">
          <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-zinc-300">
            Total: {stats.total}
          </span>
          <span className="rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-amber-300">
            Pendientes: {stats.pending}
          </span>
        </div>

        <form action={logoutAdmin}>
          <button
            type="submit"
            className="rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-400 transition-colors hover:border-red-500/30 hover:text-red-300"
          >
            Cerrar sesión
          </button>
        </form>
      </div>

      {bookings.length === 0 ? (
        <p className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center text-sm text-zinc-400">
          Aún no hay solicitudes de reserva.
        </p>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <article
              key={booking.id}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="font-[family-name:var(--font-syne)] text-lg font-bold text-white">
                    {booking.name}
                  </h2>
                  <p className="mt-1 text-sm text-zinc-400">
                    {booking.eventType} · {booking.eventDate} · {booking.location}
                  </p>
                </div>

                <select
                  value={booking.status}
                  disabled={pending}
                  onChange={(e) => {
                    startTransition(async () => {
                      await changeBookingStatus(
                        booking.id,
                        e.target.value as BookingStatus
                      );
                    });
                  }}
                  className="rounded-xl border border-white/10 bg-zinc-900 px-3 py-2 text-sm text-white outline-none focus:border-purple-500/50"
                >
                  {BOOKING_STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {STATUS_LABELS[status]}
                    </option>
                  ))}
                </select>
              </div>

              <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-zinc-500">Email</dt>
                  <dd className="text-zinc-200">{booking.email}</dd>
                </div>
                <div>
                  <dt className="text-zinc-500">Teléfono</dt>
                  <dd className="text-zinc-200">{booking.phone}</dd>
                </div>
                {booking.guests && (
                  <div>
                    <dt className="text-zinc-500">Invitados</dt>
                    <dd className="text-zinc-200">{booking.guests}</dd>
                  </div>
                )}
                <div>
                  <dt className="text-zinc-500">Recibida</dt>
                  <dd className="text-zinc-200">{formatDate(booking.createdAt)}</dd>
                </div>
              </dl>

              {booking.message && (
                <p className="mt-4 rounded-xl bg-black/20 p-3 text-sm leading-relaxed text-zinc-300">
                  {booking.message}
                </p>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
