import React, { useContext, useEffect, useState } from "react";
import CartContext from "../context/CartContext";

const Checkout = () => {
  const { listItems, totalQuantity, addQuantity, removeQuantity, removeItem } =
    useContext(CartContext);
  const [totalPrice, setTotalPrice] = useState(0);

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
                <div className="item-price">{"$" + item.price + ".00"}</div>
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
                  {"$" + item.quantity * item.price + ".00"}
                </div>
              </div>
              <img
                className="item__delete"
                src="/images/icon-delete.svg"
                alt=""
                onClick={() => removeItem(item.name)}
              />
            </div>
          ))}
          <section className="final-checkout">
            <div className="total-checkout">
              <span>Total: </span>
              {"$" + totalPrice + ".00"}
            </div>
            <button
              className="btn-finalCheckout"
              onClick={() => alert("thanks!")}
            >
              Proceed to checkout
            </button>
          </section>
        </div>
      )}
    </div>
  );
};

export default Checkout;
