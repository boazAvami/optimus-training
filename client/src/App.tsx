import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home/HomePage";
import Cart from "./pages/Cart/CartPage";
import Product from "./pages/Product/ProductPage";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Product/:id" element={<Product />} />
        </Routes>
      </main>
    </>
  );
}

export default App;


