import { ui } from "@/lib/ui";

type FormFieldProps = {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
};

export function FormField({ id, label, error, children }: FormFieldProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-zinc-200">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-xs text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export const inputClassName = `${ui.bodyText} w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-zinc-500 focus:border-purple-500/50 focus:bg-white/[0.06]`;

export const selectClassName = inputClassName;

export const textareaClassName = `${inputClassName} min-h-[110px] resize-y`;
