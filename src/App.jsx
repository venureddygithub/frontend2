import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./components/Home";
import { Product } from "./components/Product";
import { Cart } from "./components/Cart";
import { ProductDetails } from "./components/ProductDetails";
import { NotFound } from "./components/NotFound";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

const App = () => {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Navigate to="/Signup" />} />
        <Route exact path="/signin" element={<SignIn />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/product" element={<Product />} />
        <Route exact path="/productDetails" element={<ProductDetails />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route exact path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
