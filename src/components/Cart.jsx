import { useContext } from "react";

import { CartContext } from "../Features/ContextProvider";
import { ProductDetails } from "./ProductDetails";
import Header from "./Header";

export const Cart = () => {
  const { cart } = useContext(CartContext);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);
  return (
    <>
      <Header />
      <div className="container mt-3">
        <div className="row ">
          <div className="col-8">
            {cart.map((each) => (
              <ul key={each.id} style={{ listStyleType: "none" }}>
                <ProductDetails productItem={each} />
              </ul>
            ))}
          </div>
          <div className="col-4">
            <div className=" text-center text-white total-price-conatiner">
              <h4>total Items:{totalItems}</h4>
              <h4>Total Price:{totalPrice}</h4>
              <button className="btn btn-warning">checkout</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
