/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createCategory } from "@/actions/admin.action";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "@tanstack/react-form";
import { ArrowLeft,  Loader2, Save, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";





const categorySchema = z.object({
  // name: z.string().min(2, "Name must be at least 2 characters"),
  name: z.string().min(2, "Invalid category name. Only letters, numbers, spaces, and hyphens are allowed."),

});

type CategoryFormValues = z.infer<typeof categorySchema>;
export default function CreateCategory() {
    const router = useRouter();
const form = useForm({
    defaultValues: {
      name: "",
    } as CategoryFormValues, 
    validators: {
      onSubmit: categorySchema,
    },
    onSubmit: async ({ value }) => {
      const toastID = toast.loading("Creating Category...");
      try {
        const res = await createCategory(value);
        console.log(res.data);
        if (res?.data) {
          toast.success("Category Created.", { id: toastID });
          router.push("/admin/categories");
        } else {
          toast.warning(res?.error?.message || "Category already exists", { id: toastID });
        }
      } catch (err: any) {
        toast.error("Failed to create category. Try later!", { id: toastID });
      }
    },
  });


  return (
    <div className="p-6 w-full mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
          className="rounded-full"
        >
          <ArrowLeft className="size-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Create New Category
          </h1>
            <p className="text-muted-foreground">
                Add a new category to classify medicines effectively.</p>
        </div>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <Card className="border-0 bg-transparent! max-w-3xl mx-auto">
          <CardContent className="space-y-4">
            <form.Field
              name="name"
              validators={{ onChange: categorySchema.shape.name }}
            >
              {(field) => (
                <div className="space-y-2">
                  <Label htmlFor={field.name}>Category Name</Label>
                  <Input
                    id={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => {
                      field.handleChange(e.target.value);
                 
                    }}
                    placeholder="e.g., Pediatric Medicines"
                  />
                  {field.state.meta.errors && (
                    <FieldError errors={field.state.meta.errors} />
                  )}
                </div>
              )}
            </form.Field>
           

           

            
            
          </CardContent>
          <CardFooter className="grid grid-cols-2 gap-7 ">
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]) => (
                <Button
                  type="submit"
                  disabled={!canSubmit}
                  className="w-full h-12 gap-2"
                >
                  {isSubmitting ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Save className="size-5" />
                  )}
                  Save Category
                </Button>
              )}
            </form.Subscribe>

            <Button
              type="button"
              variant="secondary"
              onClick={() => router.back()}
              className="w-full h-12 gap-2"
            >
              <X className="size-5" />
              Discard Changes
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  )
}
