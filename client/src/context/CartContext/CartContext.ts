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


export const cartContext = createContext<CartContextType | undefined>(
  undefined,
);

export const useCartContext = () => {
  const context = useContext(cartContext);
  if (!context) {
    throw new Error(
      'useAuthContext must be used within an AuthContextProvider',
    );
  }

  return context;
};

export const CartContext = createContext<CartContextType | undefined>(undefined);