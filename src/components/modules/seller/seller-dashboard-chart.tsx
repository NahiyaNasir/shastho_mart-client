/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import {
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Package,
  AlertCircle,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
export default function SellerDashboardChart({
  inventoryData,
  revenueData,
  chartConfig,
}: {
  inventoryData: any;
  revenueData: any;
  chartConfig: any;
}){

 return (
  <>
   <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4 flex flex-col">
          <CardHeader>
            <CardTitle>Revenue Analytics</CardTitle>
            <CardDescription>
              Daily sales performance for the last 7 days.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square max-h-75 md:aspect-video md:max-h-100 w-full"
            >
              <AreaChart
                data={revenueData}
                margin={{ left: 5, right: 6, top: 10 }}
              >
                <CartesianGrid
                  vertical={false}
                  strokeDasharray="3 3"
                  className="stroke-muted"
                />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(8, 10) + " Jan"}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => `$${value}`}
                />
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Area
                  dataKey="desktop"
                  type="natural"
                  fill="var(--color-desktop)"
                  fillOpacity={0.4}
                  stroke="var(--color-desktop)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 flex flex-col">
          <CardHeader>
            <CardTitle>Inventory by Category</CardTitle>
            <CardDescription>Current stock distribution.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square w-full max-h-75 md:max-h-100"
            >
              <BarChart
                data={inventoryData}
                layout="vertical"
                margin={{ left: 0, right: 20 }}
              >
                <XAxis type="number" hide />
                <YAxis
                  dataKey="category"
                  type="category"
                  tickLine={false}
                  axisLine={false}
                  className="capitalize"
                  width={60}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="stock"
                  layout="vertical"
                  radius={10}
                  barSize={40}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
  </>
);
}