import React, { useContext } from "react";
import CartProductCard from "../../components/CartProduct/CartProductCard";
import styles from "./cartPage.module.scss";
import { CartContext } from "../../context/CartContext/CartContext";

const CartPage: React.FC = () => {
    const cart = useContext(CartContext);

    if (!cart) {
        return <div className={styles.empty}>Cart context not available</div>;
    }

    const { products, removeItem, updateQuantity, clearCart } = cart;
    const totalPrice = products.reduce(
        (sum, product) => sum + product.price * product.quantity,
        0
    );

    if (products.length === 0) {
        return <div className={styles.empty}>Your cart is empty</div>;
    }

    return (
        <div className={styles.container}>
            <h1>Your Cart</h1>

            <div className={styles.products}>
                {products.map((product) => (
                    <CartProductCard
                        key={product.id}
                        product={product}
                        onRemove={removeItem}
                        onUpdateQuantity={updateQuantity}
                    />
                ))}
            </div>

            <div className={styles.summary}>
                <h2>Total: ${totalPrice.toFixed(2)}</h2>
                <div>
                    <button className={styles.clear} onClick={clearCart}>
                        Clear Cart
                    </button>
                    <button className={styles.checkout}>Checkout</button></div>

            </div>
        </div>
    );
};

export default CartPage;
