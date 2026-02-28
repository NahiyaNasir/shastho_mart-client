import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pill, ShoppingCart, ArrowUpRight, Eye } from "lucide-react";
import Link from "next/link";
import { IMedicine } from "@/types/medicine.types";

export default function MedicineCard({ medicine }: { medicine:IMedicine}) {
  return (
    <Card className="group overflow-hidden border-slate-200 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 rounded-2xl bg-white flex flex-col h-full">
      <CardContent className="p-0 flex flex-col h-full">

        <div className="aspect-square bg-slate-100 relative flex items-center justify-center overflow-hidden">
          <div className="text-slate-300 group-hover:scale-110 transition-transform duration-500">
            <Pill className="size-20" />
          </div>
          
          <Badge className="absolute top-3 right-3 bg-white/95 text-primary border-none shadow-sm font-bold">
            {medicine.category?.name || "Medicine"}
          </Badge>
     
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Link href={`/shop/${medicine.id}`}>
              <Button size="sm" variant="secondary" className="rounded-full shadow-lg gap-2">
                <Eye className="size-4" />
                Quick View
              </Button>
            </Link>
          </div>
        </div>


        <div className="p-5 flex flex-col flex-1">
          <div className="mb-2">
    
            <Link href={`/shop/${medicine.id}`} className="block">
              <h3 className="font-bold text-lg text-slate-900 line-clamp-1 group-hover:text-primary transition-colors flex items-center gap-1">
                {medicine.name}
                <ArrowUpRight className="size-3 opacity-0 group-hover:opacity-100 transition-all -translate-y-1" />
              </h3>
            </Link>
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest italic">
              {medicine.manufacturer || "Generic Pharma"}
            </p>
          </div>
          
          <p className="text-slate-600 text-sm line-clamp-2 min-h-10 mb-4">
            {medicine.description}
          </p>

          <div className="mt-auto pt-4 border-t flex items-center justify-between">
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Price</p>
              <p className="text-2xl font-black text-slate-900">${medicine.price}</p>
            </div>
            
            <div className="flex gap-2">
            
              <Link href={`/shop/${medicine.id}`}>
                <Button variant="outline" size="sm" className="rounded-xl border-slate-200 hover:bg-slate-50 text-slate-600 font-semibold px-3">
                  View More
                </Button>
              </Link>
             <Link href={`cart/${medicine.id}`}>
              <Button size="sm" className="rounded-xl px-4 gap-2 font-semibold shadow-lg shadow-primary/20 bg-primary hover:bg-primary/90">
                <ShoppingCart className="size-4" />
                Add
              </Button>
             </Link>
             
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}