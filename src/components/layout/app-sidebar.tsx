"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Route } from "@/types/route.types";
import { adminRoutes } from "@/routes/adminRoutes";
import { sellerRoutes } from "@/routes/sellerRoutes";
import { Roles } from "@/constants/role";
import { Pill, Shield, Store } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function AppSidebar({
  user,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  user: { role: string };
}) {
  const pathname = usePathname();
  let routes: Route[] = [];

  switch (user?.role) {
    case Roles.ADMIN:
      routes = adminRoutes;
      break;
    case Roles.SELLER:
      routes = sellerRoutes;
      break;
    default:
      routes = [];
      break;
  }

  const roleLabel = user?.role === Roles.ADMIN ? "Admin Portal" : "Seller Portal";
  const RoleIcon = user?.role === Roles.ADMIN ? Shield : Store;

  return (
    <Sidebar {...props} className="border-r border-border bg-sidebar">
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <Link href="/" className="flex items-center gap-3">
          <div className="size-9 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-sm">
            <Pill className="size-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-lg tracking-tight leading-none text-sidebar-foreground">
              Shastho<span className="text-primary">Mart</span>
            </span>
            <div className="flex items-center gap-1.5 mt-1">
              <RoleIcon className="size-3 text-muted-foreground" />
              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                {roleLabel}
              </span>
            </div>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4 space-y-4">
        {routes.map((group) => (
          <SidebarGroup key={group.title} className="p-0">
            <SidebarGroupLabel className="px-3 text-xs font-extrabold uppercase tracking-wider text-muted-foreground/70">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent className="mt-1">
              <SidebarMenu>
                {group.items.map((item) => {
                  const isActive = pathname === item.url;
                  return (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        className={`h-10 px-3 rounded-lg font-medium transition-all ${
                          isActive
                            ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                            : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sidebar-foreground"
                        }`}
                      >
                        <Link href={item.url}>{item.title}</Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
