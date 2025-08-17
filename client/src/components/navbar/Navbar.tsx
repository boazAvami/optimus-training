import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react"; // lightweight icon library
import styles from "./Navbar.module.scss"

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">Ecommerce</Link>
      </div>
      <div className={styles.cart}>
        <Link to="/cart" className={styles.cartButton}>
          <ShoppingCart size={24} />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;