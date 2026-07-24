import { ShieldCheck, Truck, Users, Heart } from "lucide-react";

export const metadata = {
  title: "About Us | Shastho Mart",
};

const values = [
  {
    icon: ShieldCheck,
    title: "Trust & Safety",
    description:
      "Every medicine on our platform comes from a licensed, verified seller — no exceptions.",
  },
  {
    icon: Truck,
    title: "Reliable Delivery",
    description:
      "We work to get your order to you quickly, wherever you are.",
  },
  {
    icon: Users,
    title: "Community First",
    description:
      "Built for customers, sellers, and pharmacies who care about accessible healthcare.",
  },
  {
    icon: Heart,
    title: "Health, Our Priority",
    description:
      "Everything we do is guided by one goal: making healthcare more accessible.",
  },
];

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black tracking-tight">About Shastho Mart</h1>
        <p className="text-muted-foreground mt-4 text-lg">
          Shastho Mart is an online marketplace connecting customers with
          verified pharmacies and sellers, making it simple to find and order
          the over-the-counter medicines you need.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-16">
        {values.map((value) => {
          const Icon = value.icon;
          return (
            <div
              key={value.title}
              className="p-6 rounded-2xl border border-slate-100 bg-white dark:bg-card flex flex-col gap-3"
            >
              <Icon className="size-8 text-primary" />
              <h3 className="font-bold text-lg">{value.title}</h3>
              <p className="text-muted-foreground text-sm">{value.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}