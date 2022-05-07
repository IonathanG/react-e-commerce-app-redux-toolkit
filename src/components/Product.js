import React, { useState, useContext } from "react";
import CartContext from "../context/CartContext";
import ProductPopUp from "./ProductPopUp";

const Product = () => {
  const product_name = "Fall Limited Edition Sneakers";
  const product_price = 125;
  const product_images = [
    {
      full: "/images/image-product-1.jpg",
      miniature: "/images/image-product-1-thumbnail.jpg",
      id: 0,
    },
    {
      full: "/images/image-product-2.jpg",
      miniature: "/images/image-product-2-thumbnail.jpg",
      id: 1,
    },
    {
      full: "/images/image-product-3.jpg",
      miniature: "/images/image-product-3-thumbnail.jpg",
      id: 2,
    },
    {
      full: "/images/image-product-4.jpg",
      miniature: "/images/image-product-4-thumbnail.jpg",
      id: 3,
    },
  ];

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
        <p>
          These low-profile sneakers are your perfect casual wear companion.
          Featuring a durable rubber outer sole, they'll withstand everything
          the weather can offer.
        </p>

        <section className="price-section">
          <div className="price-container">
            <div className="price-tag">{formatter.format(product_price)}</div>
            <div className="discount-tag">50%</div>
          </div>
          <div className="old-price">$250</div>
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
