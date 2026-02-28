// export default function SellerDashboardPage() {
//   return (
//     <div>
//       <h1> seller Dashboard </h1>

//     </div>
//   );
// }
import { DollarSign, ShoppingCart, Package, AlertCircle } from "lucide-react";

import { ChartConfig } from "@/components/ui/chart";
import DStatsCard from "@/components/modules/seller/d-status-card";
import { getSellerMetadata } from "@/actions/seller.action";
import SellerDashboardChart from "@/components/modules/seller/seller-dashboard-chart";




const revenueData = [
  { date: "2026-01-24", desktop: 0 },
  { date: "2026-01-25", desktop: 0 },
  { date: "2026-01-26", desktop: 0 },
  { date: "2026-01-27", desktop: 0 },
  { date: "2026-01-28", desktop: 0 },
  { date: "2026-01-29", desktop: 0 },
  { date: "2026-01-30", desktop: 0 },
];

const inventoryData = [
  { category: "Tablets", stock: 450, fill: "var(--color-tablets)" },
  { category: "Syrup", stock: 300, fill: "var(--color-syrup)" },
  { category: "Inhaler", stock: 150, fill: "var(--color-inhaler)" },
  { category: "Ointment", stock: 200, fill: "var(--color-ointment)" },
];

const chartConfig = {
  desktop: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
  tablets: { label: "Tablets", color: "hsl(var(--chart-1))" },
  syrup: { label: "Syrup", color: "hsl(var(--chart-2))" },
  inhaler: { label: "Inhaler", color: "hsl(var(--chart-3))" },
  ointment: { label: "Ointment", color: "hsl(var(--chart-4))" },
} satisfies ChartConfig;

export default async function SellerDashboardPage() {
  const { data } = await getSellerMetadata();
  const meta = data?.data?.meta;

  //totalOrders: 0, totalRevenue: 0, totalMedicines: 0

  console.log(data?.data);
  return (
    <div className="p-4 md:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Performance insights for your pharmacy.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DStatsCard
          title="Total Revenue"
          value={meta?.totalRevenue}
          icon={DollarSign}
          // trend="+12%"
        />
        <DStatsCard
          title="Orders"
          value={meta?.totalOrders}
          icon={ShoppingCart}
          // trend="+8%"
        />
        <DStatsCard
          title="Total Medicines"
          value={meta?.totalMedicines}
          icon={Package}
          // trend="Stable"
        />
        <DStatsCard
          title="Low Stock"
          value={'null'}
          icon={AlertCircle}
          // trend="Action Required"
          color="text-destructive"
        />
      </div>
      <SellerDashboardChart
        chartConfig={chartConfig}
        inventoryData={inventoryData}
        revenueData={revenueData}
      />
    </div>
  );
}

