"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ShieldCheck, Truck, Pill } from "lucide-react";
import { cn } from "@/lib/utils";

const slides = [
  {
    icon: ShieldCheck,
    eyebrow: "100% Verified",
    heading: "Genuine medicines, verified sellers",
    subheading:
      "Every product on Shastho Mart is sourced from licensed pharmacies you can trust.",
  },
  {
    icon: Truck,
    eyebrow: "Fast Delivery",
    heading: "Your medicines, delivered to your door",
    subheading:
      "Order in minutes and get essential medicines delivered quickly, wherever you are.",
  },
  {
    icon: Pill,
    eyebrow: "Wide Selection",
    heading: "Everything your health needs, in one place",
    subheading:
      "From daily essentials to specialty care — browse thousands of OTC medicines.",
  },
];

export function HeroSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const nextSlide = () => setIndex((i) => (i + 1) % slides.length);

  const slide = slides[index];
  const Icon = slide.icon;

  return (
    <section className="relative min-h-[60vh] md:min-h-[65vh] flex items-center bg-linear-to-b from-primary/5 to-background overflow-hidden">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center flex flex-col items-center gap-6">
          <div className="flex items-center gap-2 rounded-full bg-primary/10 text-primary px-4 py-1.5 text-sm font-semibold">
            <Icon className="size-4" />
            {slide.eyebrow}
          </div>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-slate-950 dark:text-white">
            {slide.heading}
          </h1>

          <p className="text-lg text-muted-foreground max-w-xl">
            {slide.subheading}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <Button asChild size="lg" className="h-12 px-8 text-base font-bold rounded-xl">
              <Link href="/shop">Shop Now</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base font-bold rounded-xl">
              <Link href="/about">Learn More</Link>
            </Button>
          </div>

          {/* Interactive element: manual + auto-advancing carousel controls */}
          <div className="flex items-center gap-4 mt-6">
            <button
              aria-label="Previous slide"
              onClick={prevSlide}
              className="size-9 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors"
            >
              <ChevronLeft className="size-4" />
            </button>

            <div className="flex items-center gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to slide ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    i === index ? "w-6 bg-primary" : "w-1.5 bg-slate-300",
                  )}
                />
              ))}
            </div>

            <button
              aria-label="Next slide"
              onClick={nextSlide}
              className="size-9 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-colors"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}