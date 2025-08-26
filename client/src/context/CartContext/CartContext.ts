import type { Product } from "@repo/shared/";
import { createContext, useContext } from "react";

export type ProductWithQuantity = Product & {
    quantity: number;  
};

export interface CartContextType {
    products: ProductWithQuantity[];
    addItem: (product: Product) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
}


export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error(
      'useCartContext must be used within an cartContextProvider',
    );
  }

  return context;
};

