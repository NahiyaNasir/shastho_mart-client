import { Route } from "@/types/route.types";


export const adminRoutes: Route[] = [
  {
    title: "User Management",
    url:"",
    items: [
      {
        title: "categories",
        url: "/admin/categories"
      },
      {
        title: "orders",
        url: "/admin/orders"
      },
      {
        title: "user",
        url: "/admin/users"
      },


    ],
  },
];