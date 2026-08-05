"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone, MessageSquare, Send } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
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
    setTimeout(() => {
      setIsSubmitting(false);
      setForm({ name: "", email: "", subject: "", message: "" });
      toast.success("Message sent! We'll get back to you soon.");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      {/* Header */}
      <div className="bg-muted/40 border-b border-border py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
            Get in Touch
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Have questions about medicine availability, orders, or seller partnerships? Our team is here to help 24/7.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Cards */}
          <div className="space-y-4 md:col-span-1">
            <Card className="border border-border bg-card shadow-sm rounded-2xl">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <MapPin className="size-5" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-sm">Headquarters</h3>
                  <p className="text-muted-foreground text-xs mt-1">Dhaka, Bangladesh</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border bg-card shadow-sm rounded-2xl">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Phone className="size-5" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-sm">Phone Support</h3>
                  <a href="tel:+8801000000000" className="text-muted-foreground text-xs mt-1 hover:text-primary transition-colors block">
                    +880 1000-000000
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border bg-card shadow-sm rounded-2xl">
              <CardContent className="p-6 flex items-start gap-4">
                <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                  <Mail className="size-5" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-sm">Email Us</h3>
                  <a
                    href="mailto:support@shasthomart.com"
                    className="text-muted-foreground text-xs mt-1 hover:text-primary transition-colors block truncate"
                  >
                    support@shasthomart.com
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Form */}
          <Card className="md:col-span-2 border border-border bg-card shadow-sm rounded-3xl">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground/90 font-medium">Your Name</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                      className="bg-background text-foreground border-input"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground/90 font-medium">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                      className="bg-background text-foreground border-input"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-foreground/90 font-medium">Subject</Label>
                  <Input
                    id="subject"
                    placeholder="How can we help you?"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="bg-background text-foreground border-input"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-foreground/90 font-medium">Message</Label>
                  <Textarea
                    id="message"
                    rows={5}
                    placeholder="Write your message here..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                    className="bg-background text-foreground border-input"
                  />
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full h-12 font-bold rounded-xl gap-2 shadow-md">
                  <Send className="size-4" />
                  {isSubmitting ? "Sending Message..." : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}