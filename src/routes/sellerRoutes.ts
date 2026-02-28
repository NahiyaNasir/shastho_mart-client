import { Route } from "@/types/route.types";




export const sellerRoutes: Route[] = [
  {
    title: "General",
      url: "#",
   
      
    items: [
      {
        title: "Dashboard",
        url: "/dashboard",
      },
      {
        title: "Add Medicine",
        url: "/seller/medicines/create",
      },
      {
        title: "Order",
        url: "/seller/orders",
      },
      {
        title: "Home",
        url: "/",
       
      },

    ],
  },
];