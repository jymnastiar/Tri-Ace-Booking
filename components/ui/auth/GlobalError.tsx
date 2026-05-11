import { AlertCircle } from "@/src/icons";

interface GlobalErrorProps {
  error: string | null;
}

export default function GlobalError({ error }: GlobalErrorProps) {
  if (!error) return null;

  return (
    <div className="flex items-start gap-2.5 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
      <AlertCircle className="shrink-0 mt-0.5" width="16" height="16" />
      {error}
    </div>
  );
}
