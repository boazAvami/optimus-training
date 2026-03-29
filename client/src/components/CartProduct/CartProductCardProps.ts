import type { ProductWithQuantity } from "../../context/CartContext/CartContext";

export type CartProductCardProps = {
  product: ProductWithQuantity;
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
};