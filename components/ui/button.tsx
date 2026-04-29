import Link from "next/link";

interface ButtonProps {
  variant?: "primary" | "secondary" | "reschedule" | "detail" | "buy" | "cancel"
  size?: "sm" | "md"
  href?: string
  children: React.ReactNode
  icon?: React.ReactNode
}

const variantStyles: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-primary text-white shadow-md shadow-primary/30 hover:bg-primary-dark",
  secondary: "outline-2 outline-offset-[-2px] outline-primary text-primary hover:bg-primary-light",
  reschedule: "w-21 bg-purple-600 text-white hover:bg-purple-900",
  detail: "w-21 outline-2 outline-offset-[-2px] outline-primary text-primary hover:bg-primary-light",
  buy: "w-21 bg-slate-700 text-slate-50 hover:bg-slate-900",
  cancel: "w-21 outline-2 outline-offset-[-2px] outline-red-700 text-red-700 hover:bg-red-100",
}

const sizeStyles: Record<NonNullable<ButtonProps["size"]>, string> = {
  md: "px-4 py-2 text-sm font-semibold",
  sm: "px-2 py-1 text-xs font-normal",
}

export default function Button({variant = "primary", size = "md", href, children, icon}: ButtonProps) {
  return (
    <Link href={href!} className={`${variantStyles[variant]} ${sizeStyles[size]} flex items-center justify-center gap-2 rounded-btn transition-colors duration-200`}>
      {icon && <span>{icon}</span>}
      {children}
    </Link>
  )
}