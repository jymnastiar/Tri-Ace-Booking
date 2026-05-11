interface VenueRulesProps {
  rules: string[];
}

export default function VenueRules({ rules }: VenueRulesProps) {
  return (
    <div className="animate-fade-up stagger-4">
      <h2 className="font-bold text-title text-xl mb-3">Aturan Venue</h2>
      <ol className="space-y-2">
        {rules.map((rule, idx) => (
          <li key={idx} className="flex gap-2.5 text-sm text-body">
            <span className="w-5 h-5 rounded-full bg-primary-light text-primary font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
              {idx + 1}
            </span>
            {rule}
          </li>
        ))}
      </ol>
    </div>
  );
}
