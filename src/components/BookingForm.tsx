"use client";

import { useActionState } from "react";
import { EVENT_TYPES } from "@/lib/booking-types";
import { initialBookingFormState } from "@/lib/validation/booking";
import { submitBooking } from "@/app/actions/booking";
import {
  FormField,
  inputClassName,
  selectClassName,
  textareaClassName,
} from "@/components/ui/FormField";
import { ui } from "@/lib/ui";

export function BookingForm() {
  const [state, formAction, pending] = useActionState(
    submitBooking,
    initialBookingFormState
  );

  if (state.ok) {
    return (
      <div
        className="mt-6 rounded-2xl border border-green-500/30 bg-green-500/10 p-5 text-center sm:p-6"
        role="status"
      >
        <p className="text-2xl" aria-hidden>
          ✓
        </p>
        <p className="mt-2 text-sm font-medium text-green-300 sm:text-base">
          {state.message}
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="mt-6 space-y-4" noValidate>
      {state.message && !state.ok && (
        <p
          className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
          role="alert"
        >
          {state.message}
        </p>
      )}

      <FormField id="name" label="Nombre completo *" error={state.fieldErrors?.name}>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          className={inputClassName}
          placeholder="Tu nombre"
          aria-invalid={Boolean(state.fieldErrors?.name)}
        />
      </FormField>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField id="email" label="Email *" error={state.fieldErrors?.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className={inputClassName}
            placeholder="tu@email.com"
            aria-invalid={Boolean(state.fieldErrors?.email)}
          />
        </FormField>

        <FormField id="phone" label="Teléfono / WhatsApp *" error={state.fieldErrors?.phone}>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            className={inputClassName}
            placeholder="+56 9 1234 5678"
            aria-invalid={Boolean(state.fieldErrors?.phone)}
          />
        </FormField>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          id="eventType"
          label="Tipo de evento *"
          error={state.fieldErrors?.eventType}
        >
          <select
            id="eventType"
            name="eventType"
            required
            defaultValue=""
            className={selectClassName}
            aria-invalid={Boolean(state.fieldErrors?.eventType)}
          >
            <option value="" disabled>
              Selecciona una opción
            </option>
            {EVENT_TYPES.map((type) => (
              <option key={type} value={type} className="bg-zinc-900">
                {type}
              </option>
            ))}
          </select>
        </FormField>

        <FormField
          id="eventDate"
          label="Fecha del evento *"
          error={state.fieldErrors?.eventDate}
        >
          <input
            id="eventDate"
            name="eventDate"
            type="date"
            required
            className={inputClassName}
            aria-invalid={Boolean(state.fieldErrors?.eventDate)}
          />
        </FormField>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField id="location" label="Lugar / comuna *" error={state.fieldErrors?.location}>
          <input
            id="location"
            name="location"
            type="text"
            required
            className={inputClassName}
            placeholder="Ej: Las Condes, Santiago"
            aria-invalid={Boolean(state.fieldErrors?.location)}
          />
        </FormField>

        <FormField id="guests" label="Nº de invitados (opcional)" error={state.fieldErrors?.guests}>
          <input
            id="guests"
            name="guests"
            type="text"
            className={inputClassName}
            placeholder="Ej: 120 personas"
            aria-invalid={Boolean(state.fieldErrors?.guests)}
          />
        </FormField>
      </div>

      <FormField id="message" label="Detalles adicionales (opcional)" error={state.fieldErrors?.message}>
        <textarea
          id="message"
          name="message"
          className={textareaClassName}
          placeholder="Cuéntame sobre el evento, estilo musical, horarios..."
          aria-invalid={Boolean(state.fieldErrors?.message)}
        />
      </FormField>

      <button
        type="submit"
        disabled={pending}
        className={`${ui.actionButton} border border-green-500/40 bg-gradient-to-r from-green-600 to-emerald-500 text-white shadow-[0_0_28px_rgba(34,197,94,0.35)] hover:border-green-400/60 hover:from-green-500 hover:to-emerald-400 disabled:cursor-not-allowed disabled:opacity-60`}
      >
        {pending ? "Enviando solicitud..." : "Enviar solicitud de reserva"}
      </button>
    </form>
  );
}
