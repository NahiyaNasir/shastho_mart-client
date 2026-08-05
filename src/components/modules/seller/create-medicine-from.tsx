"use client";

import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createMedicine } from "@/actions/seller.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const medicineSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().optional(),
  price: z.number().positive("Price must be greater than 0"),
  stock: z.number().int().nonnegative("Stock cannot be negative"),
  manufacturer: z.string().optional(),
  categoryId: z.string().min(1, "Category is required"),
});

type MedicineFormValues = z.infer<typeof medicineSchema>;

interface Category {
  id: string;
  name: string;
}

interface MedicineFormProps {
  categories?: Category[];
}

export default function MedicineForm({ categories = [] }: MedicineFormProps) {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      stock: 0,
      manufacturer: "",
      categoryId: "",
    } as MedicineFormValues,
    validators: {
      onSubmit: medicineSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Saving to inventory...");
      
      const payload = {
        ...value,
        genericName: value.name,
        overview: value.description || value.name,
        image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&auto=format&fit=crop&q=60",
      };

      const res = await createMedicine(payload);

      if (res?.error) {
        return toast.error(res.error.message || "Failed to create medicine", {
          id: toastId,
        });
      }

      toast.success("Medicine added successfully!", { id: toastId });
      router.push("/seller/medicines");
    },
  });

  return (
    <div className="max-w-2xl mx-auto p-6 bg-card border border-border rounded-2xl shadow-sm">
      <h2 className="text-2xl font-bold mb-6 text-foreground">Add New Medicine</h2>

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
                placeholder="e.g. Paracetamol 500mg"
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
                placeholder="Enter medicine dosage and details..."
              />
            </div>
          )}
        </form.Field>

        <form.Field name="categoryId">
          {(field) => (
            <div className="space-y-1">
              <Label>Category</Label>
              <Select
                value={field.state.value}
                onValueChange={(value) => field.handleChange(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.length === 0 ? (
                    <SelectItem value="__none" disabled>
                      No categories available
                    </SelectItem>
                  ) : (
                    categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
              {field.state.meta.errors && (
                <p className="text-destructive text-xs italic">
                  {field.state.meta.errors.join(", ")}
                </p>
              )}
            </div>
          )}
        </form.Field>

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <Button type="submit" disabled={!canSubmit} className="w-full mt-4 h-11 font-bold">
              {isSubmitting ? "Saving..." : "Create Medicine"}
            </Button>
          )}
        </form.Subscribe>
      </form>
    </div>
  );
}