import { Skeleton } from "@/components/ui/skeleton";

export default function ShopDetailLoading() {
  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="container mx-auto px-4 py-6">
        <Skeleton className="h-5 w-28" />
      </div>

      <main className="container mx-auto px-4 mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
          <Skeleton className="aspect-square w-full rounded-3xl" />

          <div className="space-y-6">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-14 w-full rounded-2xl" />
          </div>
        </div>
      </main>
    </div>
  );
}