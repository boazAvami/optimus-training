import { Product } from "./Product";

export interface Order {
  id: string;
  orderDate: Date;
  products: Product[];
}
