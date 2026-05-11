interface AuthDividerProps {
  text: string;
}

export default function AuthDivider({ text }: AuthDividerProps) {
  return (
    <div className="flex items-center gap-3 my-6">
      <div className="flex-1 h-px bg-border" />
      <span className="text-xs text-text-caption font-medium shrink-0">{text}</span>
      <div className="flex-1 h-px bg-border" />
    </div>
  );
}
