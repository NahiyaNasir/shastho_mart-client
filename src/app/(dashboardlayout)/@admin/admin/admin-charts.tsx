"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from "recharts";

const monthlyData = [
  { name: "Jan", orders: 400, revenue: 2400 },
  { name: "Feb", orders: 300, revenue: 1398 },
  { name: "Mar", orders: 200, revenue: 9800 },
  { name: "Apr", orders: 278, revenue: 3908 },
  { name: "May", orders: 189, revenue: 4800 },
  { name: "Jun", orders: 239, revenue: 3800 },
  { name: "Jul", orders: 349, revenue: 4300 },
];

const statusData = [
  { name: "Pending", value: 400 },
  { name: "Shipped", value: 300 },
  { name: "Delivered", value: 300 },
  { name: "Cancelled", value: 200 },
];
const COLORS = ["#f59e0b", "#3b82f6", "#10b981", "#ef4444"];

export function AdminCharts() {
  return (
    <>
      {/* Bar Chart - Orders over time */}
      <Card className="rounded-xl border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-bold">Orders Overview</CardTitle>
          <CardDescription>Monthly order volume for the current year (Demo Data)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip cursor={{ fill: "#f1f5f9" }} />
                <Bar dataKey="orders" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Pie Chart - Order Status */}
      <Card className="rounded-xl border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-bold">Order Status Distribution</CardTitle>
          <CardDescription>Breakdown of current order statuses (Demo Data)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {statusData.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                <span className="text-xs font-semibold text-muted-foreground">{entry.name}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
