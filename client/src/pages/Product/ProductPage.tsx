import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import styles from "./ProductPage.module.scss";
import { products } from "@repo/shared/src/mocks";
import { CartContext, useCartContext } from "../../context/CartContext/CartContext";

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);
  const cartContext = useCartContext();


  if (!product) {
    return <div className={styles.notFound}>Product not found</div>;
  }

  const handleAddToCart = () => {
    cartContext.addItem(product);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img src={product.imageUrl} alt={product.name} className={styles.image} />
        <div className={styles.details}>
          <h1 className={styles.name}>{product.name}</h1>
          <p className={styles.description}>{product.description}</p>
          <p className={styles.price}>${product.price}</p>
          <p className={styles.seller}>Seller: {product.sellerName}</p>
          <p className={styles.category}>Category: {product.category.name}</p>

          {product.additionalInfo && (
            <div className={styles.additionalInfo}>
              <table>
                <tbody>
                  {Object.entries(product.additionalInfo).map(([key, value]) => (
                    <tr key={key}>
                      <th>{key}</th>
                      <td>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <button className={styles.addToCart} onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
