import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import CartContext from "../context/CartContext";

const CartPopUp = () => {
  const { listItems, removeItem } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <div className="cart__popup">
      <h3>Cart</h3>
      {listItems.length === 0 && (
        <div className="cart__popup--list cart-empty">Your cart is empty.</div>
      )}
      {listItems.length > 0 && (
        <div className="cart__popup--list cart-full">
          {listItems.map((item) => (
            <div className="item__container" key={item.name}>
              <img
                className="item__container--image"
                src="/images/image-product-1-thumbnail.jpg"
                alt=""
              />
              <div className="item__container--details">
                <p>{item.name}</p>
                <p>
                  {"$" + item.price + ".00 x " + item.quantity}
                  <span>{"$" + item.quantity * item.price + ".00"}</span>
                </p>
              </div>
              <img
                className="item__container--delete"
                src="/images/icon-delete.svg"
                alt=""
                onClick={() => removeItem(item.name)}
              />
            </div>
          ))}
          <button
            className="btn-checkout"
            onClick={() => navigate("/checkout")}
          >
            Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPopUp;
