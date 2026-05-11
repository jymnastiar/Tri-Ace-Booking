export default function SkeletonCard() {
  return (
    <div className="venue-card bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
      <div className="relative overflow-hidden h-44 bg-gray-200 animate-pulse">
        <div className="absolute top-3 left-3 flex gap-1.5">
          <span className="h-6 w-20 rounded-full bg-gray-300 animate-pulse inline-block" />
          <span className="h-6 w-16 rounded-full bg-gray-300 animate-pulse inline-block" />
        </div>
      </div>

      <div className="p-4 flex flex-col gap-2">
        <div className="h-4 w-3/4 rounded-md bg-gray-200 animate-pulse mb-1" />

        <div className="flex items-center gap-2">
          <div className="h-3 w-8 rounded bg-gray-200 animate-pulse" />
          <div className="h-3 w-32 rounded bg-gray-200 animate-pulse" />
        </div>

        <div className="flex items-center justify-between mt-3">
          <div className="h-4 w-28 rounded bg-gray-200 animate-pulse" />
          <div className="h-6 w-16 rounded-full bg-gray-200 animate-pulse" />
        </div>
      </div>
    </div>
  );
}