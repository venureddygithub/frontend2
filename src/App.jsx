import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { Product } from "./components/Product";
import { Cart } from "./components/Cart";
import { ProductDetails } from "./components/ProductDetails";
import { NotFound } from "./components/NotFound";
import { Header } from "./components/Header";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product" element={<Product />} />
        <Route exact path="/productDetails" element={<ProductDetails />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
