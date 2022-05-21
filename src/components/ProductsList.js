import React from "react";
import { NavLink } from "react-router-dom";
import Product_Data from "../data.json";
import { useDispatch } from "react-redux";
import { addItem } from "../feature/cartSlice";

const ProductsList = () => {
  const dispatch = useDispatch();
  const productsList = Product_Data.products;
  //console.log(productsList);

  let formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <div className="products-list">
      {productsList.map((item) => (
        <section className="products-list__item" key={item.id}>
          <div className="products-list__item--container">
            <img src={item.images[0].full} alt="picture_of_sneaker" />
            <h3>{item.name}</h3>
            <p>{formatter.format(item.price)}</p>
            <section className="item-action">
              <div className="add-product">
                <img
                  src="/images/icon-cart.svg"
                  alt=""
                  onClick={() =>
                    dispatch(
                      addItem({
                        name: item.name,
                        quantity: 1,
                        price: item.price,
                        id: item.id,
                        img: item.images[0].full,
                      })
                    )
                  }
                />
              </div>
              <NavLink to={`/item/${item.id}`}>
                <button type="text" className="view-product">
                  View Product
                </button>
              </NavLink>
            </section>
          </div>
        </section>
      ))}
    </div>
  );
};

export default ProductsList;
