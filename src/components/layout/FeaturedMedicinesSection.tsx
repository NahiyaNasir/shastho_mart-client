import Link from "next/link";
import { getAllMedicines } from "@/actions/user.action";
import MedicineCard from "@/components/layout/MedicineCard";
import { Button } from "@/components/ui/button";
import { IMedicine } from "@/types/medicine.types";
import { ArrowRight } from "lucide-react";

export const FeaturedMedicinesSection = async () => {
  const { data } = await getAllMedicines({ limit: 8, sortBy: "createdAt", sortOrder: "desc" });
  const medicines: IMedicine[] = data?.data || [];

  if (medicines.length === 0) return null;

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Featured Medicines</h2>
            <p className="text-muted-foreground mt-2">
              Freshly stocked and ready to ship.
            </p>
          </div>
          <Button asChild variant="outline" className="hidden sm:flex gap-2">
            <Link href="/shop">
              View all
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {medicines.map((medicine) => (
            <MedicineCard key={medicine.id} medicine={medicine} />
          ))}
        </div>

        <div className="flex justify-center mt-8 sm:hidden">
          <Button asChild variant="outline" className="gap-2">
            <Link href="/shop">
              View all
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};