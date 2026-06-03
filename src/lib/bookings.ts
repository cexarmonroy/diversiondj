import "server-only";

import type {
  Booking,
  BookingInput,
  BookingStatus,
} from "@/lib/booking-types";
import { createServerClient } from "@/lib/supabase/server";

type BookingRow = {
  id: number;
  name: string;
  email: string;
  phone: string;
  event_type: string;
  event_date: string;
  location: string;
  guests: string | null;
  message: string | null;
  status: BookingStatus;
  created_at: string;
};

function mapRow(row: BookingRow): Booking {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone,
    eventType: row.event_type as Booking["eventType"],
    eventDate: row.event_date,
    location: row.location,
    guests: row.guests,
    message: row.message,
    status: row.status,
    createdAt: row.created_at,
  };
}

export async function createBooking(input: BookingInput): Promise<Booking> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("bookings")
    .insert({
      name: input.name,
      email: input.email,
      phone: input.phone,
      event_type: input.eventType,
      event_date: input.eventDate,
      location: input.location,
      guests: input.guests ?? null,
      message: input.message ?? null,
    })
    .select("*")
    .single();

  if (error || !data) {
    throw new Error(error?.message ?? "Error al crear la reserva");
  }

  return mapRow(data as BookingRow);
}

export async function listBookings(): Promise<Booking[]> {
  const supabase = createServerClient();

  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data as BookingRow[]).map(mapRow);
}

export async function updateBookingStatus(
  id: number,
  status: BookingStatus
): Promise<void> {
  const supabase = createServerClient();

  const { error } = await supabase
    .from("bookings")
    .update({ status })
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}

export async function getBookingStats() {
  const supabase = createServerClient();

  const [totalResult, pendingResult] = await Promise.all([
    supabase.from("bookings").select("*", { count: "exact", head: true }),
    supabase
      .from("bookings")
      .select("*", { count: "exact", head: true })
      .eq("status", "pending"),
  ]);

  if (totalResult.error) throw new Error(totalResult.error.message);
  if (pendingResult.error) throw new Error(pendingResult.error.message);

  return {
    total: totalResult.count ?? 0,
    pending: pendingResult.count ?? 0,
  };
}
