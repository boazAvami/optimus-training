import React from "react";
import styles from "./CartProductCard.module.scss";
import type { CartProductCardProps } from "./CartProductCardProps";
import { Trash } from "lucide-react";

const CartProductCard: React.FC<CartProductCardProps> = ({ product, onRemove, onUpdateQuantity }) => {
    return (
        <div className={styles.card}>
            <img src={product.imageUrl} alt={product.name} className={styles.image} />

            <div className={styles.details}>
                <h3 className={styles.name}>{product.name}</h3>
                <div className={styles.meta}>${product.price.toFixed(2)} • Qty: {product.quantity}</div>

                <div className={styles.controls}>
                    <button onClick={() => onUpdateQuantity(product.id, product.quantity - 1)}>-</button>
                    <span>{product.quantity}</span>
                    <button onClick={() => onUpdateQuantity(product.id, product.quantity + 1)}>+</button>
                </div>
            </div>

            <button className={styles.remove} onClick={() => onRemove(product.id)}>
                <Trash size={16} />
            </button>
        </div>
    );
};

export default CartProductCard;
