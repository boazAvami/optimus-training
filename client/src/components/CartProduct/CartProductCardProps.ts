import type { ProductWithQuantity } from "../../context/CartContext/CartContext";

export type CartProductCardProps = {
  product: ProductWithQuantity;
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
};