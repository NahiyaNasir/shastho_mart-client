import { getReviews } from "@/actions/user.action";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Review } from "@/types/review.types";

import { Star } from "lucide-react";

export const TestimonialsSection = async () => {
  const { data } = await getReviews({ limit: 6, sortBy: "rating", sortOrder: "desc" });
  const reviews: Review[] = data?.data || [];

  if (reviews.length === 0) return null;

  return (
    <section className="py-16 bg-slate-50/50 dark:bg-slate-900/40">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight">What Our Customers Say</h2>
          <p className="text-muted-foreground mt-2">
            Real reviews from real customers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <Card key={review.id} className="h-full">
              <CardContent className="p-6 flex flex-col gap-4">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`size-4 ${
                        i < review.rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-slate-200"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-4">
                  &ldquo;{review.comment}&rdquo;
                </p>
                <div className="flex items-center gap-3 mt-auto pt-2">
                  <Avatar className="size-9">
                    <AvatarImage src={review.user?.image ?? undefined} />
                    <AvatarFallback>
                      {review.user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold">{review.user?.name}</p>
                    <p className="text-xs text-muted-foreground">
                      on {review.medicine?.name}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};