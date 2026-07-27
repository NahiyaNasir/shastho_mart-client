import { Skeleton } from "@/components/ui/skeleton";
import { MedicineCardSkeleton } from "@/components/shared/medicine-card-skeleton";

export default function HomeLoading() {
  return (
    <div>
      <div className="min-h-[60vh] md:min-h-[65vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-6 w-full max-w-2xl px-4">
          <Skeleton className="h-7 w-40 rounded-full" />
          <Skeleton className="h-14 w-full" />
          <Skeleton className="h-5 w-3/4" />
          <div className="flex gap-3">
            <Skeleton className="h-12 w-36 rounded-xl" />
            <Skeleton className="h-12 w-36 rounded-xl" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <MedicineCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}