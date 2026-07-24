"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { toast } from "sonner";

export const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    // Note: no backend subscriber storage yet — this is UI-only for now.
    // Wire this to a real endpoint if/when a Subscriber model is added.
    setTimeout(() => {
      setIsSubmitting(false);
      setEmail("");
      toast.success("Thanks for subscribing!");
    }, 500);
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto text-center flex flex-col items-center gap-4 p-10 rounded-3xl border border-slate-100 bg-slate-50/50 dark:bg-slate-900/40">
          <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Mail className="size-6 text-primary" />
          </div>
          <h2 className="text-2xl font-bold">Stay in the loop</h2>
          <p className="text-muted-foreground">
            Get updates on new arrivals, offers, and health tips.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full mt-2">
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11"
              required
            />
            <Button type="submit" disabled={isSubmitting} className="h-11 px-6 font-semibold">
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};