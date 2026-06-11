import type { InputHTMLAttributes } from "react";

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function Field({ label, error, id, ...props }: FieldProps) {
  return (
    <label htmlFor={id} className="block">
      <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-muted">{label}</span>
      <input
        id={id}
        className="w-full border border-line bg-ink/40 px-4 py-3 text-bone outline-none transition-colors placeholder:text-faint focus:border-accent"
        {...props}
      />
      {error && <span className="mt-1.5 block text-xs text-red-400">{error}</span>}
    </label>
  );
}
