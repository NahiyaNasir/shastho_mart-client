import { MedicineCardSkeleton } from "@/components/shared/medicine-card-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function ShopLoading() {
  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      <div className="bg-white border-b mb-8">
        <div className="container mx-auto px-4 py-12">
          <Skeleton className="h-10 w-64 mb-3" />
          <Skeleton className="h-4 w-80" />
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="mb-10">
          <Skeleton className="h-11 w-full max-w-md" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <MedicineCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}