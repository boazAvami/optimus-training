import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./ProductPage.module.scss";
import { useCartContext } from "../../context/CartContext/CartContext";
import type { ProductModel } from "../../api/generated/model";
import { useProductsControllerGetProductsByIds } from "../../api/generated/endpoints";

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const cartContext = useCartContext();

  const { mutate: fetchProducts } = useProductsControllerGetProductsByIds({
    mutation: {
      onSuccess: (res) => {
        setProduct(res[0] ?? null);
        setLoading(false);
      },
      onError: (err) => {
        setError("Failed to fetch product");
        setLoading(false);
      },
    },
  });

  useEffect(() => {
    if (id) {
      fetchProducts({ data: { ids: [Number(id)] } });
    }
  }, [id, fetchProducts]);
  const [product, setProduct] = useState<ProductModel | null>(null);



  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!product) return <div className={styles.notFound}>Product not found</div>;

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
          <button className={styles.addToCart} onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
