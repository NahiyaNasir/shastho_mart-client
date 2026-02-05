import {
  LayoutDashboard,
  Package,
  Users,
  Store,
  ShoppingCart,
  Settings,
} from "lucide-react";
import { Roles } from "@/constanst/role";

export const sidebarConfig = {
  [Roles.ADMIN]: [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Categories",
      href: "/admin/categories",
      icon: Package,
    },
    {
      title: "Sellers",
      href: "/admin/sellers",
      icon: Store,
    },
    {
      title: "Customers",
      href: "/admin/customers",
      icon: Users,
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ],

  [Roles.SELLER]: [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Medicines",
      href: "/dashboard/medicine",
      icon: Package,
    },
    {
      title: "Orders",
      href: "/dashboard/orders",
      icon: ShoppingCart,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ],

  [Roles.CUSTOMER]: [
    {
      title: "My Orders",
      href: "/orders",
      icon: ShoppingCart,
    },
    {
      title: "Profile",
      href: "/profile",
      icon: Users,
    },
  ],
};
