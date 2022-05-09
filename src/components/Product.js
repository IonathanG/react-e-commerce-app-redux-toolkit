import React, { useState, useContext } from "react";
import CartContext from "../context/CartContext";
import ProductPopUp from "./ProductPopUp";
import Product_Data from "../data.json";

const Product = () => {
  const {
    name: product_name,
    price: product_price,
    original_price,
    images: product_images,
    description: product_description,
    discount: product_discount,
  } = Product_Data.products[0];

  const [itemQuantity, setItemQuantity] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const [productPopup, setProductPopup] = useState(false);
  const { addItem } = useContext(CartContext);

  let formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const addQuantity = () => {
    setItemQuantity((prevState) => prevState + 1);
  };

  const removeQuantity = () => {
    if (itemQuantity > 0) setItemQuantity((prevState) => prevState - 1);
  };

  const handlePrevious = () => {
    if (imageIndex === 0) setImageIndex(product_images.length - 1);
    else setImageIndex((prevState) => prevState - 1);
  };

  const handleNext = () => {
    if (imageIndex === product_images.length - 1) setImageIndex(0);
    else setImageIndex((prevState) => prevState + 1);
  };

  return (
    <div className="product">
      <div className="product__images">
        <div
          className="next-previous__small previous__small"
          onClick={() => handlePrevious()}
        >
          <img
            src="/images/icon-previous.svg"
            alt="button_previous"
            className="btn-previous"
          />
        </div>
        <div
          className="next-previous__small next__small"
          onClick={() => handleNext()}
        >
          <img
            src="/images/icon-next.svg"
            alt="button_previous"
            className="btn-next"
          />
        </div>
        <img
          className="product__images--full"
          src={product_images[imageIndex].full}
          alt="full_picture_sneakers"
          onClick={() => setProductPopup(true)}
        />
        <div className="product__images--miniatures">
          {product_images.map((image) => (
            <div
              className={imageIndex === image.id ? "img-active" : ""}
              key={image.id}
            >
              <img
                src={image.miniature}
                alt="miniature_picture_sneakers"
                onClick={() => setImageIndex(image.id)}
              />
            </div>
          ))}
        </div>
        {productPopup && (
          <ProductPopUp
            images={product_images}
            setProductPopup={setProductPopup}
            imageDisplayed={imageIndex}
          />
        )}
      </div>
      <div className="product__description">
        <header>
          <div className="company-title">Sneaker Company</div>
          <div className="product-title">{product_name}</div>
        </header>
        <p>{product_description}</p>

        <section className="price-section">
          <div className="price-container">
            <div className="price-tag">{formatter.format(product_price)}</div>
            <div className="discount-tag">{product_discount}</div>
          </div>
          <div className="old-price">{"$" + original_price}</div>
        </section>

        <section className="shop__item">
          <div className="shop__item--quantity">
            <img
              onClick={() => removeQuantity()}
              src="/images/icon-minus.svg"
              alt=""
            />
            <p>{itemQuantity}</p>
            <img
              onClick={() => addQuantity()}
              src="/images/icon-plus.svg"
              alt=""
            />
          </div>
          <button
            className="shop__item--add"
            onClick={() => addItem(product_name, itemQuantity, product_price)}
          >
            <img className="icon-cart" src="/images/icon-cart.svg" alt="" />
            <p>Add to cart</p>
          </button>
        </section>
      </div>
    </div>
  );
};

export default Product;
