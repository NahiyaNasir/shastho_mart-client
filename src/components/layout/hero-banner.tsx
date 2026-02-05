
"use client";

// import { HeroImages } from "@/constants/home-images";
import { Card, CardContent } from "../ui/card";
import { useState } from "react";
import Image from "next/image";
import { TooltipButton } from "../ui/tooltip-button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function HeroBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

//   const nextSlide = () => {
//     setCurrentIndex((prev) => (prev === HeroImages.length - 1 ? 0 : prev + 1));
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prev) => (prev === 0 ? HeroImages.length - 1 : prev - 1));
//   };

//   const current = HeroImages[currentIndex];

  return (
    <div className="flex gap-4 w-11/12 h-160 items-center mx-auto py-5">
      <Card className="w-full h-full relative overflow-hidden group">
        <CardContent className="h-full flex items-center justify-around p-10 bg-secondary/20 relative">
          <div className="flex flex-col gap-4 max-w-lg z-10 absolute bottom-10 left-10">
            <h1 className="text-3xl font-semibold">
              {current?.heading}
            </h1>
            <p className="text-md tracking-wide text-muted-foreground">
              {current?.description}
            </p>
          </div>

          <div className="relative w-100 h-100">
            <Image
              src={current?.image}
              alt="Hero"
              fill
              className="object-contain"
            />
          </div>

          <div className="absolute inset-y-0 right-5 flex flex-col items-center justify-center gap-4">
            <TooltipButton
              icon={ChevronLeft}
              title="Prev"
              onClick={prevSlide}
              className="rounded-full shadow-lg bg-background hover:bg-primary hover:text-white"
            />
            <TooltipButton
              icon={ChevronRight}
              title="Next"
              onClick={nextSlide}
              className="rounded-full shadow-lg bg-background hover:bg-primary hover:text-white"
            />
          </div>
        </CardContent>

        <div className="absolute bottom-5 left-10 flex gap-2">
          {HeroImages.map((_, idx) => (
            <div
              key={idx}
              className={`h-2 w-2 rounded-full transition-all ${idx === currentIndex ? "bg-primary w-6" : "bg-gray-300"}`}
            />
          ))}
        </div>
      </Card>

      <Card className="hidden lg:block w-1/3 h-full bg-primary/10 border-dashed border-primary/20">
        <CardContent className="h-full flex items-center justify-center text-muted-foreground">
          Promotional Space
        </CardContent>
      </Card>
    </div>
  );
}
