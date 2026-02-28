import MedicineForm from "@/components/modules/seller/create-medicine-from";
import { Button } from "@/components/ui/button";
import { AdminService } from "@/service/admin.service";
import { X } from "lucide-react";



export default async function AddMedicinePage() {
  const { data } = await AdminService.getCategories({ limit: 20 });
       console.log(data,"categories data in add medicine page"); // Debug log
  const categories = data?.data?.data;

  return (
    <div className="p-6 w-full mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-normal tracking-tight">New Medicine</h1>
          <p className="text-muted-foreground text-sm">
            Add a new product to your pharmacy listing.
          </p>
        </div>
        <Button
          variant="secondary"
          // onClick={() => router.back()}
        >
          <X className="size-4" /> Discard
        </Button>
      </div>
 
      <MedicineForm categories={categories} />
    </div>
  );
}