import styles from "./ProductCard.module.scss";
import type { Product } from "@repo/shared/src/entities";
import { useCartContext } from "../../context/CartContext/CartContext";
import { useNavigate } from "react-router-dom"; // Assuming react-router-dom

interface Props {
    product: Product;
}

export const ProductCard = ({ product }: Props) => {
    const cartContext = useCartContext()
    const addItem = cartContext.addItem;
    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/product/${product.id}`);
    };

    const handleAddToCart = (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
        e.stopPropagation();
        if (addItem) {
            addItem({ ...product });
        }
    };

    return (
        <div className={styles.card} onClick={handleNavigate}>
            <img
                src={product.imageUrl}
                alt={product.name}
                className={styles.image}
            />

            <div className={styles.details}>
                <h3 className={styles.name}>{product.name}</h3>
                <p className={styles.price}>${product.price.toFixed(2)}</p>
                <p className={styles.seller}>Seller: {product.sellerName}</p>
                <button
                    className={styles.addBtn}
                    onClick={handleAddToCart}
                    disabled={!addItem}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};
