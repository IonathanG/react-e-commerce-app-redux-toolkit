import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import CartContext from "../context/CartContext";
import UserContext from "../context/UserContext";

const Checkout = () => {
  const { listItems, totalQuantity, addQuantity, removeQuantity, removeItem } =
    useContext(CartContext);
  const { user } = useContext(UserContext);

  const [totalPrice, setTotalPrice] = useState(0);
  const [isCheckedOut, setIsCheckedOut] = useState(false);

  //format number in currency style
  let formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  useEffect(() => {
    if (listItems.length > 0) {
      for (let i = 0; i < listItems.length; i++) {
        setTotalPrice(listItems[i].price * listItems[i].quantity);
      }
    }
  }, [totalQuantity, listItems]);

  return (
    <div className="checkout">
      {listItems.length === 0 && (
        <div className="checkout__empty">Your cart is empty.</div>
      )}
      {listItems.length > 0 && (
        <div className="checkout__list">
          {listItems.map((item) => (
            <div className="checkout__list__item" key={item.name}>
              <img
                className="checkout__list__item--img"
                src="/images/image-product-1-thumbnail.jpg"
                alt=""
              />
              <div className="checkout__list__item--details">
                <div className="item-name">{item.name}</div>
                <div className="item-price">{formatter.format(item.price)}</div>
                <div className="item-quantity">
                  <img
                    onClick={() => removeQuantity(item.name)}
                    src="/images/icon-minus.svg"
                    alt=""
                  />
                  <p>{item.quantity}</p>
                  <img
                    onClick={() => addQuantity(item.name)}
                    src="/images/icon-plus.svg"
                    alt=""
                  />
                </div>

                <div className="item-totalPrice">
                  <span>Subtotal: </span>
                  {formatter.format(item.quantity * item.price)}
                </div>
              </div>
              <img
                className="item__delete"
                src="/images/icon-delete.svg"
                alt=""
                onClick={() => removeItem(item.name)}
              />
              <div
                className="item__delete__small"
                onClick={() => removeItem(item.name)}
              >
                <img
                  src="/images/icon-close.svg"
                  alt="delete-item"
                  className="delete-btn"
                />
              </div>
            </div>
          ))}
          <section className="final-checkout">
            <div className="total-checkout">
              <span>Total: </span>
              {formatter.format(totalPrice)}
            </div>
            {user ? (
              <button
                className="btn-finalCheckout"
                onClick={() => setIsCheckedOut(true)}
              >
                Proceed to checkout
              </button>
            ) : (
              <NavLink
                to="/connect"
                className={(nav) => (nav.isActive ? "nav-active" : "")}
              >
                <button className="btn-finalCheckout">
                  Please Login/Signup to checkout
                </button>
              </NavLink>
            )}
          </section>
        </div>
      )}
      {isCheckedOut && (
        <div className="checkout__confirm-checkout">
          <img src="/images/delivery_truck.svg" alt="delivery_truck" />
          <p>
            Thank you for shopping with us!
            <br />
            Your sneakers are on the way.
          </p>
          <NavLink to="/">
            <button>Home Page</button>
          </NavLink>
          <div
            className="close__checkout"
            onClick={() => setIsCheckedOut(false)}
          >
            <img
              src="/images/icon-close.svg"
              alt="delete-item"
              className="close-btn"
            />
          </div>
        </div>
      )}
      {isCheckedOut && (
        <div
          className="checkout-dim"
          onClick={() => setIsCheckedOut(false)}
        ></div>
      )}
    </div>
  );
};

export default Checkout;
