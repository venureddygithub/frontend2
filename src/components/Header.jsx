import { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../Features/ContextProvider";

export const Header = () => {
  const { cart } = useContext(CartContext);
  return (
    <>
      <div className="header-container" style={{ height: "10vh" }}>
        <div>
          <h1 className="logo-name">Shopping city</h1>
        </div>
        <div>
          <ul className="link-container">
            <Link to="/">
              <li>Home</li>
            </Link>
            <Link to="/product">
              <li>Product</li>
            </Link>
            <Link to="/cart">
              <li>
                cart <span>{cart.length}</span>
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </>
  );
};
