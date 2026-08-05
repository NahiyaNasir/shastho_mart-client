import { getAllOrders } from "@/actions/admin.action";

import { Badge } from "@/components/ui/badge";

import { PgOptionsRs } from "@/types/pg.types";
import { Order, OrderStatus } from "@/types/order.types";
import { Package } from "lucide-react";
import PaginationControl from "@/components/shared/paginating";
import OrderFilters from "@/components/shared/order-filters";

export const dynamic = 'force-dynamic';

export default async function AdminOrders({
  searchParams,
}: {
  searchParams: Promise<PgOptionsRs & { status?: string }>;
}) {
  const { page, search, status } = await searchParams;
  const { data, error } = await getAllOrders({ page, search, status });
  const orders: Order[] = data?.data || [];
  const pagination = data?.meta;

  const statusVariant = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.DELIVERED:
        return "default";
      case OrderStatus.CANCELLED:
        return "destructive";
      case OrderStatus.CONFIRMED:
      case OrderStatus.SHIPPED:
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">All Orders</h1>
        <p className="text-muted-foreground mt-1">
          Oversee every order placed across the platform.
        </p>
      </div>

      <OrderFilters />

      {error ? (
        <div className="flex flex-col items-center justify-center py-20 bg-destructive/10 rounded-2xl border border-destructive/20 text-center p-6">
          <h3 className="text-xl font-semibold text-destructive">
            Couldn&apos;t load orders
          </h3>
          <p className="text-muted-foreground text-sm mt-1">{error.message}</p>
        </div>
      ) : orders.length > 0 ? (
        <div className="border border-border rounded-xl divide-y divide-border bg-card overflow-hidden shadow-sm">
          {orders.map((order) => (
            <div key={order.id} className="p-4 space-y-3 hover:bg-muted/50 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <p className="font-semibold text-foreground">
                    {order.user?.name || "Customer"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Order #{order.id.slice(0, 8)} &middot;{" "}
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={statusVariant(order.status)}>{order.status}</Badge>
                  <span className="font-extrabold text-foreground text-lg">${order.totalPrice}</span>
                </div>
              </div>

              <div className="text-sm text-muted-foreground bg-muted/30 p-3 rounded-lg border border-border/50">
                <p className="font-medium text-foreground text-xs uppercase tracking-wider mb-1">Shipping Address:</p>
                <p className="truncate text-foreground/90">{order.address}</p>
                {order.items && order.items.length > 0 && (
                  <ul className="mt-2 space-y-1 border-t border-border/40 pt-2 text-xs">
                    {order.items.map((item, i) => (
                      <li key={i} className="flex justify-between text-muted-foreground">
                        <span>{item.medicine?.name || "Medicine"} &times; {item.quantity}</span>
                        <span className="font-semibold text-foreground">${item.price}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 bg-card rounded-2xl border border-dashed border-border text-center p-6">
          <Package className="size-16 text-muted-foreground/30 mb-4" />
          <h3 className="text-xl font-semibold text-foreground">No Orders Found</h3>
          <p className="text-muted-foreground text-sm mt-1">There are no orders matching your current criteria.</p>
        </div>
      )}

      {pagination && pagination.totalPages > 1 && (
        <PaginationControl
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
        />
      )}
    </div>
  );
}