import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeItem } from "../feature/cartSlice";

const CartPopUp = () => {
  const dispatch = useDispatch();
  const listItems = useSelector((state) => state.cart.listItems);

  const navigate = useNavigate();

  return (
    <div className="cart__popup">
      <h3>Cart</h3>
      {listItems.length === 0 && (
        <div className="cart__popup--list cart-empty">
          <p>Your cart is empty.</p>
        </div>
      )}
      {listItems.length > 0 && (
        <div className="cart__popup--list cart-full">
          {listItems.map((item) => (
            <div className="item__container" key={item.name}>
              <img className="item__container--image" src={item.img} alt="" />
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
                onClick={() => dispatch(removeItem(item.name))}
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
