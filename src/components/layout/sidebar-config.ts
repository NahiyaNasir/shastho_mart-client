import {
  LayoutDashboard,
  Package,
  Users,
  Store,
  ShoppingCart,
  Settings,
} from "lucide-react";
import { Roles } from "@/constants/role";

export const sidebarConfig = {
  [Roles.ADMIN]: [
    {
      title: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Categories",
      href: "/admin/categories",
      icon: Package,
    },
    {
      title: "All Users",
      href: "/admin/users",
      icon: Users,
    },
    {
      title: "All Orders",
      href: "/admin/orders",
      icon: ShoppingCart,
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
      href: "/seller/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Medicines",
      href: "/seller/medicines",
      icon: Package,
    },
    {
      title: "Orders",
      href: "/seller/orders",
      icon: ShoppingCart,
    },
    {
      title: "Settings",
      href: "/seller/settings",
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
