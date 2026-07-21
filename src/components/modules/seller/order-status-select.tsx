"use client";

import { useState, useTransition } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateOrderStatus } from "@/actions/seller.action";
import { OrderStatus } from "@/types/order.types";
import { toast } from "sonner";

export default function OrderStatusSelect({
  orderId,
  status,
}: {
  orderId: string;
  status: OrderStatus;
}) {
  const [currentStatus, setCurrentStatus] = useState(status);
  const [isPending, startTransition] = useTransition();

  const handleChange = (value: string) => {
    const previous = currentStatus;
    setCurrentStatus(value as OrderStatus);

    startTransition(async () => {
      const res = await updateOrderStatus(orderId, value);
      if (res?.error) {
        setCurrentStatus(previous);
        toast.error(res.error.message || "Failed to update order status");
        return;
      }
      toast.success(`Order marked as ${value.toLowerCase()}`);
    });
  };

  return (
    <Select value={currentStatus} onValueChange={handleChange} disabled={isPending}>
      <SelectTrigger className="w-40 h-9 bg-white">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {Object.values(OrderStatus).map((s) => (
          <SelectItem key={s} value={s}>
            {s.charAt(0) + s.slice(1).toLowerCase()}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}