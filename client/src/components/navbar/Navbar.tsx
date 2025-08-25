import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import styles from "./Navbar.module.scss"
import CartIconWithCount from "../CartCountableIcon/CartCountableIcon";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">Ecommerce</Link>
      </div>
      <div className={styles.cart}>
        <Link to="/cart" className={styles.cartButton}>
          <CartIconWithCount/>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;