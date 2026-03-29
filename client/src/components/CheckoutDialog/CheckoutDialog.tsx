import React from "react";
import { toast } from "react-hot-toast";
import styles from "./CheckoutDialog.module.scss";
import type { ProductWithQuantity } from "../../context/CartContext/CartContext";
import { useOrdersControllerCreateOrder } from "../../api/generated/endpoints";

interface CheckoutDialogProps {
  isOpen: boolean;
  products: ProductWithQuantity[];
  total: number;
  onClose: () => void;
  onSendOrder?: () => void;
}

const CheckoutDialog: React.FC<CheckoutDialogProps> = ({
  isOpen,
  products,
  total,
  onClose,
  onSendOrder,
}) => {
  if (!isOpen) return null;
  const handleSendOrder = () => {
    if (products.length === 0) {
      toast.error("No products in the cart");
      return;
    }
    const orderItems = products.map((item) => ({
      productId: item.id,
      amount: item.quantity,
    }));
    sendOrder({ data: { products: orderItems } });
  };

  const handleCancel = () => {
    toast("Checkout canceled");
    onClose();
  };

  const { mutate: sendOrder } = useOrdersControllerCreateOrder({
    mutation: {
      onSuccess: (res) => {
        toast.success("Order sent successfully!");
        onSendOrder?.();
        onClose();

      },
      onError: (err) => {
        toast.error("Failed to send order");
      },
    },
  });

  return (
    <div className={styles.overlay}>
      <div className={styles.dialog}>
        <h2 className={styles.title}>Order Summary</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.colName}>Product</th>
              <th className={styles.colQty}>Qty</th>
              <th className={styles.colPrice}>Price</th>
              <th className={styles.colTotal}>Total</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (
              <tr key={item.id}>
                <td className={styles.colName}>{item.name}</td>
                <td className={styles.colQty}>{item.quantity}</td>
                <td className={styles.colPrice}>${item.price}</td>
                <td className={styles.colTotal}>${(item.price * item.quantity)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className={styles.summary}>
          <strong>Total: ${total.toFixed(2)}</strong>
          <div className={styles.actions}>
            <button className={styles.sendBtn} onClick={handleSendOrder}>
              Send Order
            </button>
            <button className={styles.cancelBtn} onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutDialog;

