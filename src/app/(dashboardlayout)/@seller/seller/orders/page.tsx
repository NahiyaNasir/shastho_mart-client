export const dynamic = 'force-dynamic';
import { getSellerOrders } from "@/actions/seller.action";
import OrderFilters from "@/components/shared/order-filters";


import { PgOptionsRs } from "@/types/pg.types";
import { Order } from "@/types/order.types";
import { Package } from "lucide-react";
import PaginationControl from "@/components/shared/paginating";
import OrderStatusSelect from "@/components/modules/seller/order-status-select";

export default async function SellerOrdersPage({
  searchParams,
}: {
  searchParams: Promise<PgOptionsRs & { status?: string }>;
}) {
  const { page, search, status } = await searchParams;
  const { data, error } = await getSellerOrders({ page, search, status });
  const orders: Order[] = data?.data || [];
  const pagination = data?.meta;

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Incoming Orders</h1>
        <p className="text-muted-foreground">
          Orders containing your medicines. Update status as you fulfill them.
        </p>
      </div>

      <OrderFilters />

      {error ? (
        <div className="flex flex-col items-center justify-center py-24 bg-red-50 rounded-3xl border border-dashed border-red-200">
          <h3 className="text-xl font-semibold text-red-700">
            Could&apos;t load orders
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
                <OrderStatusSelect orderId={order.id} status={order.status} />
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
          <h3 className="text-xl font-semibold text-slate-700">No Orders Yet</h3>
          <p className="text-slate-400">Orders containing your medicines will show up here.</p>
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