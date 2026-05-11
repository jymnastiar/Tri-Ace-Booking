import { InputHTMLAttributes } from "react";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function FormField({ label, error, className = "", ...props }: FormFieldProps) {
  return (
    <div>
      <label className="block text-xs font-semibold text-body mb-1.5">
        {label}
      </label>
      <input
        {...props}
        className={`w-full px-4 py-3 bg-input-bg border-2 border-transparent rounded-xl text-sm text-input-text placeholder:text-input-placeholder focus:outline-none focus:border-input-focus-border focus:bg-white transition-all duration-200 ${className}`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
