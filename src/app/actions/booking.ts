"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createBooking, updateBookingStatus } from "@/lib/bookings";
import { isSupabaseConfigured } from "@/lib/supabase/server";
import {
  bookingSchema,
  type BookingFormState,
} from "@/lib/validation/booking";
import type { BookingStatus } from "@/lib/booking-types";
import {
  clearAdminSession,
  isAdminAuthenticated,
  setAdminSession,
  verifyAdminPassword,
} from "@/lib/auth";
import { sendNewBookingNotification } from "@/lib/email";

export async function submitBooking(
  _prev: BookingFormState,
  formData: FormData
): Promise<BookingFormState> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    eventType: formData.get("eventType"),
    eventDate: formData.get("eventDate"),
    location: formData.get("location"),
    guests: formData.get("guests") || undefined,
    message: formData.get("message") || undefined,
  };

  const parsed = bookingSchema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: BookingFormState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (typeof field === "string" && !fieldErrors[field as keyof typeof fieldErrors]) {
        fieldErrors[field as keyof typeof fieldErrors] = issue.message;
      }
    }

    return {
      ok: false,
      message: "Revisa los campos marcados e intenta de nuevo.",
      fieldErrors,
    };
  }

  if (!isSupabaseConfigured()) {
    return {
      ok: false,
      message:
        "El sistema de reservas aún no está configurado. Contacta al administrador del sitio.",
    };
  }

  try {
    const booking = await createBooking(parsed.data);
    revalidatePath("/admin");

    try {
      await sendNewBookingNotification(booking);
    } catch (emailError) {
      console.error("[booking] Notificación por email falló:", emailError);
    }

    return {
      ok: true,
      message:
        "¡Solicitud enviada! Te contactaré en menos de 24 horas para confirmar disponibilidad.",
    };
  } catch {
    return {
      ok: false,
      message: "No pudimos guardar tu solicitud. Intenta de nuevo en unos minutos.",
    };
  }
}

export async function loginAdmin(
  _prev: { ok: boolean; message: string },
  formData: FormData
) {
  const password = String(formData.get("password") ?? "");

  if (!process.env.ADMIN_PASSWORD) {
    return {
      ok: false,
      message: "Configura ADMIN_PASSWORD en las variables de entorno.",
    };
  }

  if (!verifyAdminPassword(password)) {
    return { ok: false, message: "Contraseña incorrecta." };
  }

  await setAdminSession();
  revalidatePath("/admin");
  redirect("/admin");
}

export async function logoutAdmin() {
  await clearAdminSession();
  revalidatePath("/admin");
}

export async function changeBookingStatus(id: number, status: BookingStatus) {
  const authed = await isAdminAuthenticated();
  if (!authed) {
    throw new Error("No autorizado");
  }

  await updateBookingStatus(id, status);
  revalidatePath("/admin");
}
