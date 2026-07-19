import { getAllOrders } from "@/actions/admin.action";
import OrderFilters from "@/components/modules/admin/order-filters";
import { Badge } from "@/components/ui/badge";

import { PgOptionsRs } from "@/types/pg.types";
import { Order, OrderStatus } from "@/types/order.types";
import { Package } from "lucide-react";
import PaginationControl from "@/components/shared/paginating";

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
        <h1 className="text-3xl font-bold tracking-tight">All Orders</h1>
        <p className="text-muted-foreground">
          Oversee every order placed across the platform.
        </p>
      </div>

      <OrderFilters />

      {error ? (
        <div className="flex flex-col items-center justify-center py-24 bg-red-50 rounded-3xl border border-dashed border-red-200">
          <h3 className="text-xl font-semibold text-red-700">
            Couldn&apos;t load orders
          </h3>
          <p className="text-red-500 text-sm mt-1">{error.message}</p>
        </div>
      ) : orders.length > 0 ? (
        <div className="border rounded-xl divide-y bg-card overflow-hidden">
          {orders.map((order) => (
            <div key={order.id} className="p-4 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <p className="font-medium">
                    {order.user?.name}{" "}
                    <span className="text-muted-foreground font-normal">
                      ({order.user?.email})
                    </span>
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Order #{order.id.slice(0, 8)} &middot;{" "}
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={statusVariant(order.status)}>{order.status}</Badge>
                  <span className="font-semibold">${order.totalPrice}</span>
                </div>
              </div>

              <div className="text-sm text-muted-foreground">
                <p className="truncate">Ship to: {order.address}</p>
                <ul className="mt-1 space-y-0.5">
                  {order.items.map((item, i) => (
                    <li key={i}>
                      {item.medicine?.name} &times; {item.quantity} @ ${item.price}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border border-dashed">
          <Package className="size-16 text-slate-200 mb-4" />
          <h3 className="text-xl font-semibold text-slate-700">No Orders Found</h3>
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