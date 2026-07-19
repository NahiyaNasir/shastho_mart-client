"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/use-cart";
import { IMedicine } from "@/types/medicine.types";
import { toast } from "sonner";

export default function MedicineDetailActions({ medicine }: { medicine: IMedicine }) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const router = useRouter();

  const outOfStock = medicine.stock <= 0;

  const decrement = () => setQuantity((q) => Math.max(1, q - 1));
  const increment = () => setQuantity((q) => Math.min(medicine.stock, q + 1));

  const handleAddToCart = () => {
    if (outOfStock) return;
    addItem(medicine, quantity);
    toast.success(`${quantity} \u00d7 ${medicine.name} added to cart`);
  };

  const handleBuyNow = () => {
    if (outOfStock) return;
    addItem(medicine, quantity);
    router.push("/cart");
  };

  return (
    <div className="space-y-6 pt-4">
      <div className="flex items-center gap-6">
        <div className="flex items-center border border-slate-200 rounded-xl p-1 bg-slate-50">
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-lg hover:bg-white shadow-sm"
            onClick={decrement}
            disabled={quantity <= 1}
          >
            <Minus className="size-4" />
          </Button>
          <span className="w-12 text-center font-bold text-lg">{quantity}</span>
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-lg hover:bg-white shadow-sm"
            onClick={increment}
            disabled={quantity >= medicine.stock}
          >
            <Plus className="size-4" />
          </Button>
        </div>

        <Button
          className="flex-1 h-14 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20 gap-3"
          onClick={handleAddToCart}
          disabled={outOfStock}
        >
          <ShoppingCart className="size-5" />
          {outOfStock ? "Out of Stock" : "Add to Cart"}
        </Button>
      </div>

      <Button
        variant="outline"
        className="w-full h-14 rounded-2xl border-slate-200 font-bold hover:bg-slate-50"
        onClick={handleBuyNow}
        disabled={outOfStock}
      >
        Buy Now
      </Button>
    </div>
  );
}