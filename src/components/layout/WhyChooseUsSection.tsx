import { ShieldCheck, Truck, Clock, BadgePercent } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "100% Authentic",
    description: "Every medicine is sourced from licensed, verified sellers.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Quick, reliable delivery straight to your doorstep.",
  },
  {
    icon: Clock,
    title: "24/7 Availability",
    description: "Order anytime — our shop never closes.",
  },
  {
    icon: BadgePercent,
    title: "Fair Pricing",
    description: "Transparent pricing with no hidden fees.",
  },
];

export const WhyChooseUsSection = () => {
  return (
    <section className="py-16 bg-slate-50/50 dark:bg-slate-900/40">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight">Why Choose Shastho Mart</h2>
          <p className="text-muted-foreground mt-2">
            Health you can trust, delivered with care.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="p-6 rounded-2xl border border-slate-100 bg-white dark:bg-card flex flex-col gap-3"
              >
                <Icon className="size-8 text-primary" />
                <h3 className="font-bold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};