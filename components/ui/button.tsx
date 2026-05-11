import Link from "next/link";

interface ButtonProps {
  variant?: "primary" | "secondary" | "reschedule" | "detail" | "buy" | "cancel";
  size?: "sm" | "md" | "xl";
  href?: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const variantStyles: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-primary text-white shadow-md shadow-primary/30 hover:bg-primary-dark",
  secondary: "outline-2 outline-offset-[-2px] outline-primary text-primary hover:bg-primary-light",
  reschedule: "w-22 bg-purple-600 text-white hover:bg-purple-900",
  detail: "w-22 outline-2 outline-offset-[-2px] outline-primary text-primary hover:bg-primary-light",
  buy: "w-22 bg-slate-700 text-slate-50 hover:bg-slate-900",
  cancel: "w-22 outline-2 outline-offset-[-2px] outline-red-700 text-red-700 hover:bg-red-100",
};

const sizeStyles: Record<NonNullable<ButtonProps["size"]>, string> = {
  md: "px-4 py-2 text-sm font-semibold",
  sm: "px-2 py-1 text-xs font-normal",
  xl: "py-3.5 rounded-xl font-semibold text-sm active:scale-[.98]",
};

export default function Button({
  variant = "primary",
  size = "md",
  href,
  children,
  icon,
  onClick,
  className = "",
  type = "button",
  disabled = false,
}: ButtonProps) {
  const baseClass = `${variantStyles[variant]} ${sizeStyles[size]} flex items-center justify-center gap-2 rounded-btn transition-colors duration-200 ${className}`;

  if (href) {
    return (
      <Link href={href} className={baseClass}>
        {icon && <span>{icon}</span>}
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClass} disabled:opacity-60 disabled:cursor-not-allowed`}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
}