import { Order } from "../entities";
import { products } from "./products";

export const orders: Order[] = [
  {
    id: "order-1",
    orderDate: new Date("2025-04-01"),
    products: [products[0], products[2]],
  },
  {
    id: "order-2",
    orderDate: new Date("2025-04-15"),
    products: [products[1]],
  },
];
