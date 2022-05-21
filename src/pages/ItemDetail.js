import React from "react";
import Product from "../components/Product";
import { useParams } from "react-router-dom";

const ItemDetail = () => {
  const { id } = useParams();
  return (
    <div>
      <Product id={id} />
    </div>
  );
};

export default ItemDetail;
