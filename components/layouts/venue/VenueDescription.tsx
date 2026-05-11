interface VenueDescriptionProps {
  description: string;
}

export default function VenueDescription({ description }: VenueDescriptionProps) {
  return (
    <div className="animate-fade-up stagger-3">
      <h2 className="font-bold text-title text-xl mb-3">Deskripsi</h2>
      <div className="text-body text-sm leading-relaxed space-y-2.5">
        <p>{description}</p>
      </div>
    </div>
  );
}
