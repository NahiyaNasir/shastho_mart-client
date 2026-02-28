import { getAllMedicines } from "@/actions/user.action";
import MedicineCard from "@/components/layout/MedicineCard";
import ShopControls from "@/components/modules/customer/ShopControls";
import PaginationControl from "@/components/shared/paginatin";

import { IMedicine } from "@/types/medicine.types";
import { PgOptionsRs } from "@/types/pg.types";

import { ShoppingBag } from "lucide-react";

export default async function Shop({
  searchParams,
}: {
  searchParams: Promise<PgOptionsRs>;
}) {
  const { page, search, sortBy, sortOrder } = await searchParams;
  const { data } = await getAllMedicines({ search, page, sortBy, sortOrder });
console.log(data);
  const medicines = data?.data?.data ||[];
  const pagination = data?.data?.pagination;
  console.log(medicines, pagination, "medicines and pagination data");
  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      {/* Header */}
      <div className="bg-white border-b mb-8">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Medicine <span className="text-primary">Shop</span>
          </h1>
          <p className="text-slate-500 mt-2">
            Find your essential medicines with guaranteed quality.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Controls: Search, SortBy, SortOrder */}
        <div className="mb-10">
          <ShopControls />
        </div>

        {/* Medicines Grid */}
        {medicines.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {medicines.map((medicine: IMedicine) => (
              <MedicineCard key={medicine.id} medicine={medicine} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border border-dashed">
            <ShoppingBag className="size-16 text-slate-200 mb-4" />
            <h3 className="text-xl font-semibold text-slate-700">
              No Medicines Found
            </h3>
            <p className="text-slate-400">
              Try adjusting your filters or search term.
            </p>
          </div>
        )}

        <PaginationControl
          currentPage={pagination?.page}
          totalPages={pagination?.pages}
        />
      </div>
    </div>
  );
}
