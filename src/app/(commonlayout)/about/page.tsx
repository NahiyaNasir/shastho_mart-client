import { ShieldCheck, Truck, Users, Heart, Award, Clock, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "About Us | Shastho Mart",
  description: "Learn about Shastho Mart's mission to provide accessible, verified medicines and healthcare products.",
};

const stats = [
  { label: "Verified Pharmacists", value: "500+" },
  { label: "Medicines Available", value: "10,000+" },
  { label: "Happy Customers", value: "50,000+" },
  { label: "Cities Covered", value: "64" },
];

const values = [
  {
    icon: ShieldCheck,
    title: "100% Authentic & Verified",
    description:
      "Every single medicine listing comes strictly from licensed pharmacies and verified sellers.",
  },
  {
    icon: Truck,
    title: "Express & Secure Delivery",
    description:
      "Temperature-controlled, ultra-fast home delivery so you never run out of vital medications.",
  },
  {
    icon: Users,
    title: "Patient-Centered Platform",
    description:
      "Empowering patients with transparent pricing, generic options, and seamless ordering.",
  },
  {
    icon: Heart,
    title: "Driven by Care",
    description:
      "Our mission is simple: making quality healthcare affordable and accessible for every household.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-muted/40 border-b border-border overflow-hidden">
        <div className="container mx-auto px-4 max-w-5xl text-center relative z-10 space-y-6">
          <Badge variant="outline" className="px-4 py-1.5 rounded-full text-primary border-primary/20 bg-primary/10 text-xs font-bold gap-1.5">
            <Sparkles className="size-3.5" />
            Your Trusted Healthcare Partner
          </Badge>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-foreground leading-tight">
            Redefining Healthcare <br className="hidden md:inline" />
            <span className="text-primary">One Medicine at a Time</span>
          </h1>

          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Shastho Mart is a modern healthcare e-commerce platform bridging the gap between patients and licensed pharmacies with complete trust, speed, and safety.
          </p>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, i) => (
              <div key={i} className="space-y-1">
                <p className="text-3xl md:text-4xl font-black">{stat.value}</p>
                <p className="text-xs md:text-sm font-medium opacity-90">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="container mx-auto px-4 py-20 max-w-5xl space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-extrabold tracking-tight">Our Core Principles</h2>
          <p className="text-muted-foreground text-base max-w-xl mx-auto">
            Built on a foundation of integrity, safety, and customer satisfaction.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((val) => {
            const Icon = val.icon;
            return (
              <div
                key={val.title}
                className="p-8 rounded-3xl border border-border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow flex flex-col gap-4"
              >
                <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <Icon className="size-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground">{val.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{val.description}</p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}