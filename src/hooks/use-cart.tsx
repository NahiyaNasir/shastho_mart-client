"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { IMedicine } from "@/types/medicine.types";

const STORAGE_KEY = "shastho-cart";

export interface CartItem {
  medicineId: string;
  name: string;
  price: number;
  stock: number;
  categoryName?: string;
  quantity: number;
}

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (medicine: IMedicine, quantity?: number) => void;
  removeItem: (medicineId: string) => void;
  updateQuantity: (medicineId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage once, on mount. This must run in an effect (not
  // a useState initializer) so the server render and the first client
  // render both start from `[]` and stay hydration-safe; the effect then
  // brings in the real cart right after mount.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // ignore malformed/missing cart data
    }
    setHydrated(true);
  }, []);

  // Persist on every change, after the initial load.
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // storage full/unavailable — cart still works in-memory for this tab
    }
  }, [items, hydrated]);

  const addItem = (medicine: IMedicine, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.medicineId === medicine.id);
      const maxQty = medicine.stock;

      if (existing) {
        return prev.map((i) =>
          i.medicineId === medicine.id
            ? { ...i, quantity: Math.min(i.quantity + quantity, maxQty) }
            : i,
        );
      }

      return [
        ...prev,
        {
          medicineId: medicine.id,
          name: medicine.name,
          price: medicine.price,
          stock: medicine.stock,
          categoryName: medicine.category?.name,
          quantity: Math.min(quantity, maxQty),
        },
      ];
    });
  };

  const removeItem = (medicineId: string) => {
    setItems((prev) => prev.filter((i) => i.medicineId !== medicineId));
  };

  const updateQuantity = (medicineId: string, quantity: number) => {
    setItems((prev) =>
      prev.map((i) =>
        i.medicineId === medicineId
          ? { ...i, quantity: Math.max(1, Math.min(quantity, i.stock)) }
          : i,
      ),
    );
  };

  const clearCart = () => setItems([]);

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, itemCount, subtotal, addItem, removeItem, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}