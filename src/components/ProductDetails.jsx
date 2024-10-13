import { useContext } from "react";
import { CartContext } from "../Features/ContextProvider";

export const ProductDetails = ({ productItem }) => {
  const { dispatch } = useContext(CartContext);
  return (
    <>
      <div className="d-flex border p-3 ">
        <li>
          <img src={productItem.image} alt="image" className="w-25 h-35" />
        </li>
        <div className="details ms-4 ">
          <h4 style={{ fontSize: "18px", fontFamily: "cavet" }}>
            {productItem.title}
          </h4>
          <h4 style={{ fontWeight: "bold" }}>{productItem.price}</h4>
          <div className="buttons mt-1">
            <button
              className="rounded-cricle px-2 "
              onClick={() => dispatch({ type: "Decrease", id: productItem.id })}
            >
              -
            </button>
            <button className="rounded-cricle px-2 m-2">
              {productItem.quantity}
            </button>
            <button
              className="rounded-cricle px-2 "
              onClick={() => dispatch({ type: "Increase", id: productItem.id })}
            >
              +
            </button>
          </div>
          <button
            className="btn btn-sm btn-warning delete"
            onClick={() => dispatch({ type: "Remove", id: productItem.id })}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};
