interface AuthFormHeaderProps {
  title: string;
  subtitle: React.ReactNode;
  className?: string;
}

export default function AuthFormHeader({ title, subtitle, className = "mb-8" }: AuthFormHeaderProps) {
  return (
    <div className={className}>
      <h1 className="text-3xl font-extrabold text-primary mb-1.5 tracking-tight">
        {title}
      </h1>
      <p className="text-body text-sm leading-relaxed">
        {subtitle}
      </p>
    </div>
  );
}
