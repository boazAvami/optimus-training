import React, { useContext } from 'react';
import { ShoppingCart } from 'lucide-react';
import { CartContext, type ProductWithQuantity } from '../../context/CartContext/CartContext';
import styles from './CartCountableIcon.module.scss';
const CartIconWithCount = () => {
  const cart = useContext(CartContext);
  const { products }  = cart? cart : { products: [] };

  const getTotalQuantity = (products : ProductWithQuantity[]) => {
    return products.reduce((total, item) => total + item.quantity, 0); 
  }

  return (
    <div className={styles.cartIcon}>
      <ShoppingCart size={24} /> 
      {products.length > 0 && (
        <span className={styles.tag}>
          {getTotalQuantity(products) }
        </span>
      )}
    </div>
  );
};

export default CartIconWithCount;