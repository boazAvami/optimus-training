import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/HomePage";
import Cart from "./pages/CartPage";
import Product from "./pages/ProductPage";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Product" element={<Product />} />
        </Routes>
      </main>
    </>
  );
}

export default App;