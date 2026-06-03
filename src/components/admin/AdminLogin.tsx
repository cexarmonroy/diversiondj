"use client";

import { useActionState } from "react";
import { loginAdmin } from "@/app/actions/booking";
import { FormField, inputClassName } from "@/components/ui/FormField";
import { ui } from "@/lib/ui";

const initialState = { ok: false, message: "" };

export function AdminLogin() {
  const [state, formAction, pending] = useActionState(loginAdmin, initialState);

  return (
    <form action={formAction} className="mx-auto w-full max-w-sm space-y-4">
      <FormField id="password" label="Contraseña de administrador" error={state.message || undefined}>
        <input
          id="password"
          name="password"
          type="password"
          required
          className={inputClassName}
          placeholder="Ingresa tu contraseña"
        />
      </FormField>

      <button
        type="submit"
        disabled={pending}
        className={`${ui.actionButton} border border-purple-500/40 bg-purple-600/80 text-white hover:bg-purple-500 disabled:opacity-60`}
      >
        {pending ? "Verificando..." : "Ingresar al panel"}
      </button>
    </form>
  );
}
