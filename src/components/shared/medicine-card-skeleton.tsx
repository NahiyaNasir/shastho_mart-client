import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export function MedicineCardSkeleton() {
  return (
    <Card className="overflow-hidden border-slate-200 rounded-2xl bg-white flex flex-col h-full">
      <CardContent className="p-0 flex flex-col h-full">
        <Skeleton className="aspect-square w-full rounded-none" />
        <div className="p-5 flex flex-col flex-1 gap-3">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-3 w-1/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
          <div className="mt-auto pt-4 border-t flex items-center justify-between">
            <Skeleton className="h-7 w-16" />
            <div className="flex gap-2">
              <Skeleton className="h-9 w-20 rounded-xl" />
              <Skeleton className="h-9 w-16 rounded-xl" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}