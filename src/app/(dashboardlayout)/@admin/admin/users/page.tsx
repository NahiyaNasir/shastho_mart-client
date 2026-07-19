import { getUsers } from "@/actions/admin.action";
import UserStatusToggle from "@/components/modules/admin/user-status-toggle";
import PaginationControl from "@/components/shared/paginating";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import { PgOptionsRs } from "@/types/pg.types";
import { Role, UserStatus, User } from "@/types/user.types";
import { Users as UsersIcon } from "lucide-react";

export default async function Users({
  searchParams,
}: {
  searchParams: Promise<PgOptionsRs>;
}) {
  const { page, search } = await searchParams;
  const { data, error } = await getUsers({ search, page });
  const users: User[] = data?.data || [];
  const pagination = data?.meta;
console.log(data.data,"");
console.log("RAW backend response:", JSON.stringify(data));
  const roleBadgeVariant = (role: Role) =>
    role === Role.ADMIN ? "default" : role === Role.SELLER ? "secondary" : "outline";

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">All Users</h1>
        <p className="text-muted-foreground">
          View every customer and seller, and manage account access.
        </p>
      </div>

      {error ? (
        <div className="flex flex-col items-center justify-center py-24 bg-red-50 rounded-3xl border border-dashed border-red-200">
          <h3 className="text-xl font-semibold text-red-700">
            Could&apos;t load users
          </h3>
          <p className="text-red-500 text-sm mt-1">{error.message}</p>
        </div>
      ) : users.length > 0 ? (
        <div className="border rounded-xl divide-y bg-card overflow-hidden">
          {users.map((user) => (
            <div
              key={user.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4"
            >
              <div className="flex items-center gap-3 min-w-0">
                <Avatar>
                  <AvatarFallback>
                    {user.name?.charAt(0)?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <p className="font-medium truncate">{user.name}</p>
                  <p className="text-sm text-muted-foreground truncate">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <Badge variant={roleBadgeVariant(user.role)}>{user.role}</Badge>
                <Badge variant={user.status === UserStatus.BAN ? "destructive" : "secondary"}>
                  {user.status === UserStatus.BAN ? "Banned" : "Active"}
                </Badge>
                {user.role !== Role.ADMIN && (
                  <UserStatusToggle userId={user.id} status={user.status} />
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border border-dashed">
          <UsersIcon className="size-16 text-slate-200 mb-4" />
          <h3 className="text-xl font-semibold text-slate-700">No Users Found</h3>
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