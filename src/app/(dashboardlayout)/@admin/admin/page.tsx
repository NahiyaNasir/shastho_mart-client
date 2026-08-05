import { getStats } from "@/actions/user.action";
import { Pill, LayoutGrid, Store, PackageCheck, DollarSign, Users, ShoppingCart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminCharts } from "./admin-charts"; // We'll create this client component next

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
  const { data } = await getStats();
  const stats = data?.data;

  const statCards = [
    { label: "Total Revenue", value: "$45,231", icon: DollarSign, trend: "+20.1% from last month" }, // Placeholder trend/revenue since stats API only has basic counts
    { label: "Verified Sellers", value: stats?.totalSellers || 0, icon: Store, trend: "+4 from last month" },
    { label: "Total Medicines", value: stats?.totalMedicines || 0, icon: Pill, trend: "+12 from last month" },
    { label: "Orders Fulfilled", value: stats?.totalOrders || 0, icon: PackageCheck, trend: "+19% from last month" },
  ];

  return (
    <div className="flex flex-col gap-8 p-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back to the admin panel. Here's what's happening today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <Card key={i} className="rounded-xl border-slate-200 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-semibold text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <Icon className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-black text-foreground">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1 font-medium">{stat.trend}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
         {/* We isolate recharts in a Client Component since recharts requires use client */}
         <AdminCharts />
      </div>
    </div>
  );
}