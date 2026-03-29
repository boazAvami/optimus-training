import type { ProductModel } from "../../api/generated/model";
import { createContext, useContext } from "react";

export type ProductWithQuantity = ProductModel & {
    quantity: number;  
};

export interface CartContextType {
    products: ProductWithQuantity[];
    addItem: (product: ProductModel) => void;
    removeItem: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
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

