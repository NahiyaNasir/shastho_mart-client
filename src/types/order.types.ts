export enum OrderStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}

export interface OrderItemMedicine {
  name: string;
  price: string;
  category: {
    name: string;
  };
}

export interface OrderItem {
  quantity: number;
  price: string;
  medicine: OrderItemMedicine;
}

export interface Order {
  id: string;
  userId: string;
  status: OrderStatus;
  totalPrice: string;
  address: string;
  createdAt: string;
  user: {
    name: string;
    email: string;
  };
  items: OrderItem[];
}