"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { OrderStatus } from "@/types/order.types";

export default function OrderFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleUpdateQuery = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "ALL") params.set(key, value);
    else params.delete(key);
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3">
      <div className="relative w-full sm:max-w-xs">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
        <Input
          placeholder="Search by customer name/email..."
          className="pl-11 h-10 bg-white"
          onChange={(e) => handleUpdateQuery("search", e.target.value)}
          defaultValue={searchParams.get("search") || ""}
        />
      </div>

      <Select
        onValueChange={(v) => handleUpdateQuery("status", v)}
        defaultValue={searchParams.get("status") || "ALL"}
      >
        <SelectTrigger className="w-full sm:w-48 h-10 bg-white">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">All statuses</SelectItem>
          {Object.values(OrderStatus).map((status) => (
            <SelectItem key={status} value={status}>
              {status.charAt(0) + status.slice(1).toLowerCase()}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}