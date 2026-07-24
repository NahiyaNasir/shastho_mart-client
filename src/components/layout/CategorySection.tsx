import Link from "next/link";
import { getCategories } from "@/actions/admin.action";
import { Card, CardContent } from "@/components/ui/card";
import { Pill } from "lucide-react";

interface Category {
  id: string;
  name: string;
  description?: string;
}

export const CategorySection = async () => {
  const { data } = await getCategories({ limit: 12 });
  console.log(data.data);
  const categories: Category[] = data?.data || [];

  return (
    <section className="py-16 bg-slate-50/50 dark:bg-slate-900/40">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight">Shop by Category</h2>
          <p className="text-muted-foreground mt-2">Find the right medication for your specific needs.</p>
        </div>

        {categories.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <Link key={cat.id} href={`/shop?category=${cat.id}`}>
                <Card className="hover:border-primary transition-colors cursor-pointer group h-full">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <Pill className="size-8 mb-3 text-primary group-hover:scale-110 transition-transform" />
                    <h3 className="font-semibold text-sm">{cat.name}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">No categories available yet.</p>
        )}
      </div>
    </section>
  );
};