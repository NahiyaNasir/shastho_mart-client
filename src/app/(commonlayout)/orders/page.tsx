import Link from "next/link";
import { getMyOrders } from "@/actions/user.action";

import { Badge } from "@/components/ui/badge";

import { PgOptionsRs } from "@/types/pg.types";
import { Order, OrderStatus } from "@/types/order.types";
import { Package, ChevronRight } from "lucide-react";
import OrderFilters from "@/components/shared/order-filters";
import PaginationControl from "@/components/shared/paginating";

export default async function MyOrdersPage({
  searchParams,
}: {
  searchParams: Promise<PgOptionsRs & { status?: string }>;
}) {
  const { page, search, status } = await searchParams;
  const { data, error } = await getMyOrders({ page, search, status });
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
    <div className="container mx-auto px-4 py-10 space-y-6">
      <div>
        <h1 className="text-3xl font-black text-slate-950">My Orders</h1>
        <p className="text-slate-500">Track and review your order history.</p>
      </div>

      <OrderFilters />

      {error ? (
        <div className="flex flex-col items-center justify-center py-24 bg-red-50 rounded-3xl border border-dashed border-red-200">
          <h3 className="text-xl font-semibold text-red-700">
            Couldn&apos;t load your orders
          </h3>
          <p className="text-red-500 text-sm mt-1">{error.message}</p>
        </div>
      ) : orders.length > 0 ? (
        <div className="border rounded-2xl divide-y bg-white overflow-hidden">
          {orders.map((order) => (
            <Link
              key={order.id}
              href={`/orders/${order.id}`}
              className="flex items-center justify-between gap-4 p-5 hover:bg-slate-50 transition-colors"
            >
              <div>
                <p className="font-bold text-slate-900">
                  Order #{order.id.slice(0, 8)}
                </p>
                <p className="text-sm text-slate-500">
                  {new Date(order.createdAt).toLocaleDateString()} &middot;{" "}
                  {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Badge variant={statusVariant(order.status)}>{order.status}</Badge>
                <span className="font-black text-slate-900">${order.totalPrice}</span>
                <ChevronRight className="size-4 text-slate-300" />
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border border-dashed">
          <Package className="size-16 text-slate-200 mb-4" />
          <h3 className="text-xl font-semibold text-slate-700">No Orders Yet</h3>
          <p className="text-slate-400">
            <Link href="/shop" className="text-primary font-semibold hover:underline">
              Start shopping
            </Link>{" "}
            to place your first order.
          </p>
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