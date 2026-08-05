import { Route } from "@/types/route.types";

export const adminRoutes: Route[] = [
  {
    title: "Overview",
    url: "#",
    items: [
      {
        title: "Dashboard",
        url: "/admin",
      },
      {
        title: "Back to Home",
        url: "/",
      },
    ],
  },
  {
    title: "Management",
    url: "#",
    items: [
      {
        title: "Categories",
        url: "/admin/categories",
      },
      {
        title: "Orders",
        url: "/admin/orders",
      },
      {
        title: "Users",
        url: "/admin/users",
      },
    ],
  },
];