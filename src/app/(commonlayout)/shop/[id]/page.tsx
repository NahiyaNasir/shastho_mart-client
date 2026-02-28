import { getSingleMedicine } from "@/actions/user.action";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Minus, Pill, Plus, RotateCcw, ShieldCheck, ShoppingCart, Star, Truck } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
export default async function   ShopDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } =  await  params;
    console.log(id);
      const { data } = await getSingleMedicine(id);
      const medicine= data?.data
      console.log(data,"detail data");
      console.log(medicine);
    return(
        <div className="min-h-screen bg-white pb-20">
      {/* 1. Breadcrumbs & Back Button */}
      <div className="container mx-auto px-4 py-6">
        <Link 
          href="/shop" 
          className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors text-sm font-medium w-fit"
        >
          <ChevronLeft className="size-4" />
          Back to Shop
        </Link>
      </div>

      <main className="container mx-auto px-4 mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
          
          {/* 2. Left: Image Section */}
          <div className="space-y-4">
            <div className="aspect-square bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-center relative overflow-hidden group">
               <Pill className="size-48 text-slate-200 group-hover:scale-110 transition-transform duration-700" />
               <Badge className="absolute top-6 left-6 bg-primary/10 text-primary border-none px-4 py-1.5 text-sm font-bold">
                  {medicine?.category?.name}
               </Badge>
            </div>
            
          
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center cursor-pointer hover:border-primary/50 transition-all">
                  <Pill className="size-8 text-slate-300" />
                </div>
              ))}
            </div>
          </div>

          {/* 3. Right: Content Section */}
          <div className="flex flex-col">
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-primary font-bold text-sm uppercase tracking-widest">
                  {medicine.manufacturer}
                </p>
                <h1 className="text-4xl lg:text-5xl font-black text-slate-950 tracking-tight">
                  {medicine.name}
                </h1>
                <div className="flex items-center gap-4">
                   <div className="flex items-center gap-1 text-amber-500">
                      <Star className="size-4 fill-current" />
                      <span className="text-sm font-bold text-slate-700">4.8 (120 Reviews)</span>
                   </div>
                   <Separator orientation="vertical" className="h-4" />
                   <Badge variant="outline" className="text-emerald-600 border-emerald-100 bg-emerald-50">
                      In Stock: {medicine.stock}
                   </Badge>
                </div>
              </div>

              <div className="py-6">
                <p className="text-4xl font-black text-slate-900">
                  ${medicine.price}
                  <span className="text-sm text-slate-400 font-normal ml-2">/ per strip</span>
                </p>
              </div>

              <Separator />

              <div className="py-6 space-y-4">
                <h3 className="font-bold text-slate-900">Product Description</h3>
                <p className="text-slate-600 leading-relaxed italic">
                  {medicine.description}
                </p>
              </div>

              {/* 4. Quantity & Action Buttons */}
              <div className="space-y-6 pt-4">
                <div className="flex items-center gap-6">
                  <div className="flex items-center border border-slate-200 rounded-xl p-1 bg-slate-50">
                    <Button variant="ghost" size="icon" className="h-10 w-10 rounded-lg hover:bg-white shadow-sm">
                      <Minus className="size-4" />
                    </Button>
                    <span className="w-12 text-center font-bold text-lg">1</span>
                    <Button variant="ghost" size="icon" className="h-10 w-10 rounded-lg hover:bg-white shadow-sm">
                      <Plus className="size-4" />
                    </Button>
                  </div>
                  
                  <Button className="flex-1 h-14 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20 gap-3">
                    <ShoppingCart className="size-5" />
                    Add to Cart
                  </Button>
                </div>

                <Button variant="outline" className="w-full h-14 rounded-2xl border-slate-200 font-bold hover:bg-slate-50">
                  Buy Now
                </Button>
              </div>

              {/* 5. Trust Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-10">
                 <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <ShieldCheck className="size-8 text-primary" />
                    <span className="text-xs font-bold text-slate-700 leading-tight">100% Authentic Product</span>
                 </div>
                 <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <Truck className="size-8 text-primary" />
                    <span className="text-xs font-bold text-slate-700 leading-tight">Fast Home Delivery</span>
                 </div>
                 <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <RotateCcw className="size-8 text-primary" />
                    <span className="text-xs font-bold text-slate-700 leading-tight">7 Days Return Policy</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    )
}