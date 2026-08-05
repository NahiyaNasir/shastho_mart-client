import { Route } from "@/types/route.types";

export const sellerRoutes: Route[] = [
  {
    title: "Overview",
    url: "#",
    items: [
      {
        title: "Dashboard",
        url: "/seller/dashboard",
      },
      {
        title: "Back to Home",
        url: "/",
      },
    ],
  },
  {
    title: "Store Management",
    url: "#",
    items: [
      {
        title: "My Medicines",
        url: "/seller/medicines",
      },
      {
        title: "Add New Medicine",
        url: "/seller/medicines/create",
      },
      {
        title: "Customer Orders",
        url: "/seller/orders",
      },
    ],
  },
];