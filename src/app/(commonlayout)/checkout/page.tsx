"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/hooks/use-cart";
import { createOrder } from "@/actions/user.action";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { ShoppingBag } from "lucide-react";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [address, setAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-4">
        <ShoppingBag className="size-16 text-muted-foreground/40" />
        <h1 className="text-2xl font-bold text-foreground">Your cart is empty</h1>
        <p className="text-muted-foreground">Add some medicines before checking out.</p>
        <Button asChild className="mt-2">
          <Link href="/shop">Go to Shop</Link>
        </Button>
      </div>
    );
  }

  const handlePlaceOrder = async () => {
    if (!address.trim()) {
      toast.error("Please enter a shipping address");
      return;
    }

    setIsSubmitting(true);
    const res = await createOrder({
      address: address.trim(),
      items: items.map((i) => ({ medicineId: i.medicineId, quantity: i.quantity })),
    });
    setIsSubmitting(false);

    if (res?.error) {
      toast.error(res.error.message || "Failed to place order");
      return;
    }

    const orderId = res?.data?.data?.id;
    clearCart();
    toast.success("Order placed successfully! Cash on Delivery.");
    router.push(orderId ? `/orders/${orderId}` : "/orders");
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <h1 className="text-3xl font-black text-foreground mb-8">Checkout</h1>

      <div className="space-y-6">
        <div className="border border-border rounded-2xl p-6 bg-card text-card-foreground shadow-sm space-y-3">
          <h2 className="font-bold text-lg text-foreground">Shipping Address</h2>
          <Label htmlFor="address" className="text-foreground/90 font-medium">Full delivery address</Label>
          <Textarea
            id="address"
            placeholder="House, road, area, city, postal code..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows={4}
            className="bg-background text-foreground border-input placeholder:text-muted-foreground focus-visible:ring-primary"
          />
        </div>

        <div className="border border-border rounded-2xl p-6 bg-card text-card-foreground shadow-sm space-y-3">
          <h2 className="font-bold text-lg text-foreground">Order Summary</h2>
          <ul className="divide-y divide-border">
            {items.map((item) => (
              <li key={item.medicineId} className="py-3 flex justify-between text-sm">
                <span className="text-muted-foreground font-medium">
                  {item.name} &times; {item.quantity}
                </span>
                <span className="font-semibold text-foreground">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
          <div className="border-t border-border pt-4 flex justify-between font-black text-xl text-foreground">
            <span>Total (Cash on Delivery)</span>
            <span className="text-primary">${subtotal.toFixed(2)}</span>
          </div>
        </div>

        <Button
          className="w-full h-14 rounded-2xl text-lg font-bold shadow-md"
          onClick={handlePlaceOrder}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Placing Order..." : "Place Order"}
        </Button>
      </div>
    </div>
  );
}