import { Search, ShoppingCart, Truck, PackageCheck } from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Search",
    description: "Browse our catalog or search for the medicine you need.",
  },
  {
    icon: ShoppingCart,
    title: "Add to Cart",
    description: "Pick your quantity and add it to your cart in one tap.",
  },
  {
    icon: Truck,
    title: "Checkout",
    description: "Confirm your address and place your order — cash on delivery.",
  },
  {
    icon: PackageCheck,
    title: "Receive",
    description: "Track your order and receive it right at your doorstep.",
  },
];

export const HowItWorksSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight">How It Works</h2>
          <p className="text-muted-foreground mt-2">
            Getting your medicines has never been easier.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="flex flex-col items-center text-center gap-3">
                <div className="relative">
                  <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <Icon className="size-7 text-primary" />
                  </div>
                  <span className="absolute -top-2 -right-2 size-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-bold">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};