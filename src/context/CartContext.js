import { createContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [listItems, setListItems] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);

  //check local storage for items on page reload
  useEffect(() => {
    let storedData = window.localStorage.listItems
      ? JSON.parse(localStorage.getItem("listItems"))
      : [];
    setListItems(storedData);
  }, []);

  //update local storage with item list on change
  useEffect(() => {
    localStorage.setItem("listItems", JSON.stringify(listItems));
  }, [listItems, totalQuantity]);

  //update total quantity on reload
  useEffect(() => {
    setTotalQuantity(0);
    for (let i = 0; i < listItems.length; i++) {
      setTotalQuantity((prevState) => prevState + listItems[i].quantity);
    }
  }, [listItems]);

  //add item to the cart or add quantity of an item already in the cart
  const addItem = (name, quantity, price) => {
    let itemFound = false;

    if (quantity > 0) {
      setTotalQuantity((prevState) => prevState + quantity);

      for (let i = 0; i < listItems.length; i++) {
        if (listItems[i].name === name) {
          listItems[i].quantity += quantity;
          itemFound = true;
        }
      }
      if (!itemFound)
        setListItems((prevState) => [...prevState, { name, quantity, price }]);
    }
  };

  //remove an item from the cart
  const removeItem = (name) => {
    if (listItems.length > 0) {
      let newArray = [];

      for (let i = 0; i < listItems.length; i++) {
        if (listItems[i].name !== name) newArray.push(listItems[i]);
        else setTotalQuantity((prevState) => prevState - listItems[i].quantity);
      }
      setListItems(newArray);
    }
  };

  //adding quantity to an item from the cart
  const addQuantity = (name) => {
    for (let i = 0; i < listItems.length; i++) {
      if (listItems[i].name === name) {
        listItems[i].quantity += 1;
        setTotalQuantity((prevState) => prevState + 1);
      }
    }
  };

  //removing quantity to an item from the cart
  const removeQuantity = (name) => {
    for (let i = 0; i < listItems.length; i++) {
      if (listItems[i].name === name) {
        if (listItems[i].quantity > 1) listItems[i].quantity -= 1;
        else removeItem(name);
        setTotalQuantity((prevState) => prevState - 1);
      }
    }
  };

  const deleteCart = () => {
    setListItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        listItems,
        totalQuantity,
        addItem,
        removeItem,
        addQuantity,
        removeQuantity,
        deleteCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
