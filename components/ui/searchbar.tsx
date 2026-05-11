import { Search } from "@/src/icons";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative mb-6 animate-fade-up">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted"/>
      <input
        type="text"
        placeholder="Cari lapangan, lokasi, atau jenis olahraga…"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="search-input w-full pl-11 pr-4 py-3.5 bg-white border border-border rounded-xl text-sm text-title placeholder-muted transition-shadow shadow-sm"
      />
    </div>
  );
}