export const EVENT_TYPES = [
  "Matrimonio",
  "Fiesta de empresa",
  "Evento privado",
  "Celebración social",
  "Otro",
] as const;

export const BOOKING_STATUSES = [
  "pending",
  "contacted",
  "confirmed",
  "cancelled",
] as const;

export type EventType = (typeof EVENT_TYPES)[number];
export type BookingStatus = (typeof BOOKING_STATUSES)[number];

export type Booking = {
  id: number;
  name: string;
  email: string;
  phone: string;
  eventType: EventType;
  eventDate: string;
  location: string;
  guests: string | null;
  message: string | null;
  status: BookingStatus;
  createdAt: string;
};

export type BookingInput = {
  name: string;
  email: string;
  phone: string;
  eventType: EventType;
  eventDate: string;
  location: string;
  guests?: string;
  message?: string;
};

export const STATUS_LABELS: Record<BookingStatus, string> = {
  pending: "Pendiente",
  contacted: "Contactado",
  confirmed: "Confirmado",
  cancelled: "Cancelado",
};
