"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.message.trim()) {
      toast.error("Please fill in your name and message");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    // NOTE: not yet persisted to the database — this is UI-only for now.
    // A dedicated Contact backend endpoint (with DB storage) is planned.
    setTimeout(() => {
      setIsSubmitting(false);
      setForm({ name: "", email: "", message: "" });
      toast.success("Message sent! We'll get back to you soon.");
    }, 600);
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black tracking-tight">Contact Us</h1>
        <p className="text-muted-foreground mt-4 text-lg">
          Have a question? We&apos;d love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-6">
          <div className="flex items-start gap-3">
            <MapPin className="size-5 text-primary mt-0.5" />
            <div>
              <p className="font-semibold">Address</p>
              <p className="text-muted-foreground text-sm">Dhaka, Bangladesh</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="size-5 text-primary mt-0.5" />
            <div>
              <p className="font-semibold">Phone</p>
              <a href="tel:+8801000000000" className="text-muted-foreground text-sm hover:text-primary">
                +880 1000-000000
              </a>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Mail className="size-5 text-primary mt-0.5" />
            <div>
              <p className="font-semibold">Email</p>
              <a
                href="mailto:support@shasthomart.com"
                className="text-muted-foreground text-sm hover:text-primary"
              >
                support@shasthomart.com
              </a>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              rows={5}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
            />
          </div>
          <Button type="submit" disabled={isSubmitting} className="w-full h-11 font-semibold">
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </div>
    </div>
  );
}