import { z } from "zod";
import { EVENT_TYPES } from "@/lib/booking-types";

export const bookingSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Ingresa tu nombre completo")
    .max(120, "Nombre demasiado largo"),
  email: z
    .string()
    .trim()
    .email("Ingresa un email válido")
    .max(160, "Email demasiado largo"),
  phone: z
    .string()
    .trim()
    .min(8, "Ingresa un teléfono válido")
    .max(30, "Teléfono demasiado largo"),
  eventType: z.enum(EVENT_TYPES, {
    message: "Selecciona un tipo de evento",
  }),
  eventDate: z
    .string()
    .min(1, "Selecciona la fecha del evento")
    .refine((value) => !Number.isNaN(Date.parse(value)), {
      message: "Fecha inválida",
    }),
  location: z
    .string()
    .trim()
    .min(2, "Indica el lugar o comuna del evento")
    .max(200, "Ubicación demasiado larga"),
  guests: z
    .string()
    .trim()
    .max(50, "Valor demasiado largo")
    .optional()
    .transform((v) => v || undefined),
  message: z
    .string()
    .trim()
    .max(2000, "Mensaje demasiado largo")
    .optional()
    .transform((v) => v || undefined),
});

export type BookingFormState = {
  ok: boolean;
  message: string;
  fieldErrors?: Partial<Record<keyof z.infer<typeof bookingSchema>, string>>;
};

export const initialBookingFormState: BookingFormState = {
  ok: false,
  message: "",
};
