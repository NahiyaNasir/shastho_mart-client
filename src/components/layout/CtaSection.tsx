import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const CtaSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="rounded-3xl bg-primary text-primary-foreground p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-black">Ready to feel better?</h2>
            <p className="opacity-90 mt-2">
              Browse thousands of medicines and get them delivered today.
            </p>
          </div>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="h-12 px-8 text-base font-bold rounded-xl gap-2 shrink-0"
          >
            <Link href="/shop">
              Start Shopping
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};