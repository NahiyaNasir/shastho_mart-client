import { getStats } from "@/actions/user.action";
import { Pill, LayoutGrid, Store, PackageCheck } from "lucide-react";

export const StatsSection = async () => {
  const { data } = await getStats();
  const stats = data?.data;

  const items = [
    { label: "Medicines Listed", value: stats?.totalMedicines, icon: Pill },
    { label: "Categories", value: stats?.totalCategories, icon: LayoutGrid },
    { label: "Verified Sellers", value: stats?.totalSellers, icon: Store },
    { label: "Orders Fulfilled", value: stats?.totalOrders, icon: PackageCheck },
  ];

  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map(({ label, value, icon: Icon }) => (
            <div key={label} className="flex flex-col items-center text-center gap-2">
              <Icon className="size-8 opacity-90" />
              <p className="text-4xl font-black">{value ?? "—"}+</p>
              <p className="text-sm font-medium opacity-90">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};