import Image from "next/image";
import { ComponentPropsWithoutRef, ElementType } from "react";

type BadgeVariant = "hero" | "stats" | "category" | "status";
type BadgeVariantStatus = "penuh" | "terbatas" | "tersedia";

type BadgeProps<T extends ElementType = "div"> = {
  as?: T;
  variant: BadgeVariant;
  dot?: boolean;
  icon?: string | React.ReactNode;
  children: React.ReactNode;
  className?: string;
  variantStatus?: BadgeVariantStatus;
} & ComponentPropsWithoutRef<T>;

const variantStyles: Record<BadgeVariant, string> = {
  hero: "inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3.5 py-1.5 text-xs font-semibold text-sky-200",
  stats: "flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 rounded-full px-4 py-2 text-sm",
  category: "inline-flex items-center gap-1 bg-white/90 backdrop-blur-sm text-primary text-xs font-semibold px-2.5 py-1 rounded-full border border-primary/20 shadow-sm",
  status: "text-xs font-semibold px-2 py-0.5 rounded-full",
};

const variantStylesStatus: Record<BadgeVariantStatus, string> = {
  terbatas: "text-yellow-600 bg-yellow-50",
  penuh: "text-red-600 bg-red-50",
  tersedia:"text-primary bg-primary-light",
};

const dotStyle = "w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse";

export default function Badge<T extends ElementType = "div">({
  as,
  variant,
  dot = false,
  icon,
  children,
  className = "",
  variantStatus,
  ...props
}: BadgeProps<T>) {
  const Component = as || "div";

  const statusColorClass = variant == "status" && variantStatus ? variantStylesStatus[variantStatus] : "";

  const combinedClass = [
    variantStyles[variant],
    statusColorClass,
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <Component className={combinedClass} {...props}>
      {dot && <span className={dotStyle} />}

      {icon &&
        (typeof icon === "string" ? (
          <Image src={icon} alt="icon-badge" width={16} height={16} />
        ) : (
          icon
        ))}

      {children}
    </Component>
  );
}