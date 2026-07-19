"use client";

import Link from "next/link";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

export default function CartPage() {
  const { items, subtotal, updateQuantity, removeItem } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center px-4">
        <ShoppingBag className="size-16 text-slate-200" />
        <h1 className="text-2xl font-bold text-slate-800">Your cart is empty</h1>
        <p className="text-slate-500">Browse the shop and add some medicines.</p>
        <Button asChild className="mt-2">
          <Link href="/shop">Go to Shop</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-black text-slate-950 mb-8">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item.medicineId}
              className="flex items-center gap-4 p-4 border border-slate-200 rounded-2xl bg-white"
            >
              <div className="flex-1 min-w-0">
                <p className="font-bold text-slate-900 truncate">{item.name}</p>
                {item.categoryName && (
                  <p className="text-xs text-slate-400 uppercase font-bold tracking-wide">
                    {item.categoryName}
                  </p>
                )}
                <p className="text-sm text-slate-500 mt-1">${item.price} each</p>
              </div>

              <div className="flex items-center border border-slate-200 rounded-xl p-1 bg-slate-50 shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-lg hover:bg-white shadow-sm"
                  onClick={() => updateQuantity(item.medicineId, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  <Minus className="size-3.5" />
                </Button>
                <span className="w-8 text-center font-bold">{item.quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-lg hover:bg-white shadow-sm"
                  onClick={() => updateQuantity(item.medicineId, item.quantity + 1)}
                  disabled={item.quantity >= item.stock}
                >
                  <Plus className="size-3.5" />
                </Button>
              </div>

              <p className="w-20 text-right font-black text-slate-900 shrink-0">
                ${(item.price * item.quantity).toFixed(2)}
              </p>

              <Button
                variant="ghost"
                size="icon"
                className="text-slate-400 hover:text-destructive shrink-0"
                onClick={() => removeItem(item.medicineId)}
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="border border-slate-200 rounded-2xl p-6 bg-white sticky top-6 space-y-4">
            <h2 className="font-bold text-lg text-slate-900">Order Summary</h2>
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span className="font-semibold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-400 text-sm">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
            <div className="border-t pt-4 flex justify-between font-black text-xl text-slate-950">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <Button asChild className="w-full h-12 rounded-xl font-bold text-base">
              <Link href="/checkout">Proceed to Checkout</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}