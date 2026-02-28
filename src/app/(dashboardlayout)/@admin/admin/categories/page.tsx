/* eslint-disable @typescript-eslint/no-explicit-any */
import CategoryCard from "@/components/shared/category-card";
import { Button } from "@/components/ui/button";
import { AdminService } from "@/service/admin.service";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function Categories() {
    const { data } = await AdminService.getCategories();
      const categories = data?.data;
         console.log(data?.data,"from cate");
      console.log(categories);
   

  return (
  <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Medicine Categories
          </h1>
          <p className="text-muted-foreground">
            Manage the global classification system for all listings.
          </p>
        </div>
        <Link href={"categories/create"}>
          <Button className="gap-2 bg-primary">
            <Plus className="size-4" /> Create Category
          </Button>
        </Link>
      </div>
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories?.map((cate: any, idx: number) => (
              <CategoryCard key={idx} cate={cate} />
            ))}
          </div>
      </div>
  );
}
