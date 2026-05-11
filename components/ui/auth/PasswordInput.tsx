import { useState, InputHTMLAttributes } from "react";
import { Eye, EyeOff } from "@/src/icons";

interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function PasswordInput({ label, error, className = "", ...props }: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label className="block text-xs font-semibold text-body mb-1.5">
        {label}
      </label>
      <div className="relative">
        <input
          {...props}
          type={showPassword ? "text" : "password"}
          className={`w-full px-4 py-3 pr-11 bg-input-bg border-2 border-transparent rounded-xl text-sm text-input-text placeholder:text-input-placeholder focus:outline-none focus:border-input-focus-border focus:bg-white transition-all duration-200 ${className}`}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-text-caption hover:text-primary transition-colors"
          aria-label={showPassword ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
        >
          {showPassword ? (
            <EyeOff width="18" height="18" />
          ) : (
            <Eye width="18" height="18" />
          )}
        </button>
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
