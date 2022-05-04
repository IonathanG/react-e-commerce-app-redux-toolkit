import React, { useState } from "react";

const ProductPopUp = ({ images, setProductPopup, imageDisplayed }) => {
  const [imageIndex, setImageIndex] = useState(imageDisplayed);

  const handlePrevious = () => {
    if (imageIndex === 0) setImageIndex(images.length - 1);
    else setImageIndex((prevState) => prevState - 1);
  };

  const handleNext = () => {
    if (imageIndex === images.length - 1) setImageIndex(0);
    else setImageIndex((prevState) => prevState + 1);
  };

  return (
    <>
      <div className="product__popup">
        <div className="product__images">
          <div
            className="next-previous__container previous__container"
            onClick={() => handlePrevious()}
          >
            <img
              src="/images/icon-previous.svg"
              alt="button_previous"
              className="btn-previous"
            />
          </div>
          <div
            className="next-previous__container next__container"
            onClick={() => handleNext()}
          >
            <img
              src="/images/icon-next.svg"
              alt="button_next"
              className="btn-next"
            />
          </div>
          <img
            className="product__images--full popup__full"
            src={images[imageIndex].full}
            alt="full_picture_sneakers"
          />
          <div className="product__images--miniatures popup__miniature">
            {images.map((image) => (
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
        </div>
        <img
          src="/images/icon-close.svg"
          alt=""
          className="close-btn"
          onClick={() => setProductPopup(false)}
        />
      </div>
      <div className="popup-dim" onClick={() => setProductPopup(false)}></div>
    </>
  );
};

export default ProductPopUp;
