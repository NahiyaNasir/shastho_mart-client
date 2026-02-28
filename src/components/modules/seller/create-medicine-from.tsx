"use client";

import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createMedicine } from "@/actions/seller.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation"; // 2. Add router import

const medicineSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().optional(),
  // Use z.number() for strict typing with TanStack Form
  price: z.number().positive("Price must be greater than 0"),
  stock: z.number().int().nonnegative("Stock cannot be negative"),
  manufacturer: z.string().optional(),
  categoryId: z.string().min(1, "Category is required"),
  sellerId: z.string().min(1, "Seller ID is required"),
});

type MedicineFormValues = z.infer<typeof medicineSchema>;

export default function MedicineForm() {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      stock: 0,
      manufacturer: "",
      categoryId: "",
      sellerId: "",
    } as MedicineFormValues,
    validators: {
      onSubmit: medicineSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Saving to inventory...");
      const res = await createMedicine(value);

      if (res?.error) {
         return toast.warning("Medicine already exist", {
          id: toastId,
        });
      }

      toast.success("Medicine added!", { id: toastId });
      router.push("/seller/medicines");
    },
  });

  return (
    <div className="max-w-2xl mx-auto p-6 bg-card border rounded-xl shadow-sm">
      <h2 className="text-2xl font-bold mb-6">Add New Medicine</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-4"
      >
        {/* Name Field */}
        <form.Field name="name">
          {(field) => (
            <div className="space-y-1">
              <Label htmlFor={field.name}>Medicine Name</Label>
              <Input
                id={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
              {field.state.meta.errors && (
                <p className="text-destructive text-xs italic">
                  {field.state.meta.errors.join(", ")}
                </p>
              )}
            </div>
          )}
        </form.Field>

        <div className="grid grid-cols-2 gap-4">
          {/* Price Field */}
          <form.Field name="price">
            {(field) => (
              <div className="space-y-1">
                <Label>Price ($)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={field.state.value}
                  // 4. Use valueAsNumber to keep TypeScript happy
                  onChange={(e) => field.handleChange(e.target.valueAsNumber)}
                />
              </div>
            )}
          </form.Field>

          {/* Stock Field */}
          <form.Field name="stock">
            {(field) => (
              <div className="space-y-1">
                <Label>Stock Quantity</Label>
                <Input
                  type="number"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.valueAsNumber)}
                />
              </div>
            )}
          </form.Field>
        </div>

        {/* Description Field */}
        <form.Field name="description">
          {(field) => (
            <div className="space-y-1">
              <Label>Description</Label>
              <Textarea
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        </form.Field>

        <div className="grid grid-cols-2 gap-4">
          <form.Field name="categoryId">
            {(field) => (
              <div className="space-y-1">
                <Label>Category ID</Label>
                <Input
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            )}
          </form.Field>
          <form.Field name="sellerId">
            {(field) => (
              <div className="space-y-1">
                <Label>Seller ID</Label>
                <Input
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </div>
            )}
          </form.Field>
        </div>

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <Button type="submit" disabled={!canSubmit} className="w-full mt-4">
              {isSubmitting ? "Saving..." : "Create Medicine"}
            </Button>
          )}
        </form.Subscribe>
      </form>
    </div>
  );
}