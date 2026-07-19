import { Card, CardContent } from "@/components/ui/card";

const categories = [
  { name: "Pain Relief", icon: "💊", count: "120+ Products" },
  { name: "Fever & Cold", icon: "🌡️", count: "80+ Products" },
  { name: "Skincare", icon: "🧴", count: "200+ Products" },
  { name: "Vitamins", icon: "🍎", count: "150+ Products" },
  { name: "Baby Care", icon: "🍼", count: "90+ Products" },
  { name: "First Aid", icon: "🩹", count: "40+ Products" },
];

 export  const CategorySection = () => {
  return (
    <section className="py-16 bg-slate-50/50">
      <div className="container">
        <div className="flex flex-col items-center mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight">Shop by Category</h2>
          <p className="text-muted-foreground mt-2">Find the right medication for your specific needs.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Card key={cat.name} className="hover:border-primary transition-colors cursor-pointer group">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <span className="text-4xl mb-3 group-hover:scale-110 transition-transform">{cat.icon}</span>
                <h3 className="font-semibold text-sm">{cat.name}</h3>
                <p className="text-xs text-muted-foreground mt-1">{cat.count}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};