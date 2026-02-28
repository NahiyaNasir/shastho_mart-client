/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

export default function DStatsCard({
  title,
  value,
  icon: Icon,
  trend,
  color,
}: any) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        <Icon className={`size-7 ${color || "text-muted-foreground"}`} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center text-sm text-muted-foreground mt-1">
          <TrendingUp className="mr-1 size-3 text-emerald-500" />
          {trend}
        </div>
      </CardContent>
    </Card>
  );
}