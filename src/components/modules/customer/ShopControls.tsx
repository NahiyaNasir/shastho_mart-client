"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Search, ArrowDownUp, SortAsc, History, DollarSign, Type } from "lucide-react";

export default function ShopControls() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleUpdateQuery = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
      {/* Search Bar */}
      <div className="relative w-full lg:max-w-md">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
        <Input
          placeholder="Search by name..."
          className="pl-11 h-11 bg-white rounded-xl border-slate-200 shadow-sm"
          onChange={(e) => handleUpdateQuery("search", e.target.value)}
          defaultValue={searchParams.get("search") || ""}
        />
      </div>

      {/* Sort Section */}
      <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-xl border border-slate-200 shadow-sm w-full lg:w-auto overflow-x-auto">
        <div className="flex items-center gap-2 px-2">
          <span className="text-[10px] font-bold uppercase text-slate-400">SortBy</span>
          <Select onValueChange={(v) => handleUpdateQuery("sortBy", v)} defaultValue={searchParams.get("sortBy") || "createdAt"}>
            <SelectTrigger className="w-30 h-9 border-0! focus:ring-0! bg-transparent font-semibold">
              <SelectValue placeholder="Criteria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name"><div className="flex items-center gap-2"><Type className="size-3.5"/>Name</div></SelectItem>
              <SelectItem value="price"><div className="flex items-center gap-2"><DollarSign className="size-3.5"/>Price</div></SelectItem>
              <SelectItem value="createdAt"><div className="flex items-center gap-2"><History className="size-3.5"/>Newest</div></SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator orientation="vertical" className="h-6" />

        <div className="flex items-center gap-2 px-2">
          <span className="text-[10px] font-bold uppercase text-slate-400">Order</span>
          <Select onValueChange={(v) => handleUpdateQuery("sortOrder", v)} defaultValue={searchParams.get("sortOrder") || "desc"}>
            <SelectTrigger className="w-25 h-9 border-0! focus:ring-0! bg-transparent font-semibold">
              <SelectValue placeholder="Order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="desc"><div className="flex items-center gap-2"><ArrowDownUp className="size-3.5 rotate-180"/>Desc</div></SelectItem>
              <SelectItem value="asc"><div className="flex items-center gap-2"><SortAsc className="size-3.5"/>Asc</div></SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}