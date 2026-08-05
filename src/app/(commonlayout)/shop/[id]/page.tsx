import { getAllMedicines, getSingleMedicine } from "@/actions/user.action";
import { ChevronLeft, Pill, RotateCcw, ShieldCheck, Star, Stethoscope, Truck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import MedicineDetailActions from "@/components/modules/customer/medicine-detail-actions";
import MedicineCard from "@/components/layout/MedicineCard";
import { IMedicine } from "@/types/medicine.types";
export default async function   ShopDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } =  await  params;
      const { data } = await getSingleMedicine(id);
      const medicine= data?.data;
      
      const relatedRes = await getAllMedicines({ categoryId: medicine?.categoryId, limit: 5 });
      const relatedMedicines = relatedRes.data?.data?.filter((m: IMedicine) => m.id !== id).slice(0, 4) || [];

      if (!medicine) {
        return (
          <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-center px-4">
            <Pill className="size-16 text-slate-200" />
            <h1 className="text-2xl font-bold text-slate-800">Medicine not found</h1>
            <Link href="/shop" className="text-primary font-semibold hover:underline">
              Back to Shop
            </Link>
          </div>
        );
      }

      const reviews = medicine.reviews ?? [];
      const avgRating =
        reviews.length > 0
          ? reviews.reduce((sum: number, r: { rating: number }) => sum + r.rating, 0) / reviews.length
          : null;
      const hasDiscount = medicine.discountPrice != null && medicine.discountPrice < medicine.price;

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
               {medicine.image ? (
                 <Image
                   src={medicine.image}
                   alt={medicine.name}
                   fill
                   sizes="(max-width: 1024px) 100vw, 50vw"
                   className="object-cover group-hover:scale-105 transition-transform duration-700"
                 />
               ) : (
                 <Pill className="size-48 text-slate-200 group-hover:scale-110 transition-transform duration-700" />
               )}
               <Badge className="absolute top-6 left-6 bg-primary/10 text-primary border-none px-4 py-1.5 text-sm font-bold">
                  {medicine?.category?.name}
               </Badge>
            </div>
          </div>

          {/* 3. Right: Content Section */}
          <div className="flex flex-col">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-primary font-bold text-sm uppercase tracking-widest">
                    {medicine.genericName}
                  </p>
                  {medicine.strength && (
                    <Badge variant="outline" className="text-xs">{medicine.strength}</Badge>
                  )}
                  {medicine.isPrescriptionRequired && (
                    <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50 gap-1 text-xs">
                      <Stethoscope className="size-3" />
                      Prescription Required
                    </Badge>
                  )}
                </div>
                <h1 className="text-4xl lg:text-5xl font-black text-slate-950 tracking-tight">
                  {medicine.name}
                </h1>
                <div className="flex items-center gap-4">
                   {avgRating !== null ? (
                     <div className="flex items-center gap-1 text-amber-500">
                        <Star className="size-4 fill-current" />
                        <span className="text-sm font-bold text-slate-700">
                          {avgRating.toFixed(1)} ({reviews.length} Review{reviews.length !== 1 ? "s" : ""})
                        </span>
                     </div>
                   ) : (
                     <span className="text-sm text-slate-400">No reviews yet</span>
                   )}
                   <Separator orientation="vertical" className="h-4" />
                   <Badge variant="outline" className="text-emerald-600 border-emerald-100 bg-emerald-50">
                      In Stock: {medicine.stock}
                   </Badge>
                </div>
              </div>

              <div className="py-6">
                {hasDiscount ? (
                  <div className="flex items-baseline gap-3">
                    <p className="text-4xl font-black text-slate-900">${medicine.discountPrice}</p>
                    <p className="text-xl text-slate-400 line-through">${medicine.price}</p>
                  </div>
                ) : (
                  <p className="text-4xl font-black text-slate-900">
                    ${medicine.price}
                    <span className="text-sm text-slate-400 font-normal ml-2">/ {medicine.unitType}</span>
                  </p>
                )}
              </div>

              <Separator />

              <div className="py-6 space-y-4">
                <h3 className="font-bold text-slate-900">Product Description</h3>
                <p className="text-slate-600 leading-relaxed italic">
                  {medicine.description}
                </p>
                {medicine.overview && (
                  <p className="text-slate-500 leading-relaxed text-sm">
                    {medicine.overview}
                  </p>
                )}
              </div>

              {/* 4. Quantity & Action Buttons */}
              <MedicineDetailActions medicine={medicine} />

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

              {/* 6. Reviews */}
              {reviews.length > 0 && (
                <div className="pt-10 space-y-4">
                  <h3 className="font-bold text-slate-900">Customer Reviews</h3>
                  <div className="space-y-3">
                    {reviews.map((review: { id: string; rating: number; comment: string; user?: { name: string } }) => (
                      <div key={review.id} className="p-4 rounded-xl border border-slate-100 bg-slate-50/50">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="flex gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`size-3.5 ${
                                  i < review.rating ? "fill-amber-400 text-amber-400" : "text-slate-200"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs font-semibold text-slate-600">
                            {review.user?.name}
                          </span>
                        </div>
                        <p className="text-sm text-slate-600">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* 7. Related Medicines */}
      {relatedMedicines.length > 0 && (
        <section className="container mx-auto px-4 mt-16 mb-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Related Medicines</h2>
            <Link href={`/shop?category=${medicine.categoryId}`} className="text-primary font-semibold hover:underline text-sm">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedMedicines.map((relatedMed: IMedicine) => (
              <MedicineCard key={relatedMed.id} medicine={relatedMed} />
            ))}
          </div>
        </section>
      )}
    </div>

    )
}