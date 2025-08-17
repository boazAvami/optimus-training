import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react"; // lightweight icon library
import "./Navbar.scss";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">Ecommerce</Link>
      </div>
      <div className="cart">
        <Link to="/cart" className="cart-button">
          <ShoppingCart size={24} />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;