import { createSlice } from "@reduxjs/toolkit";

//check for local storage cart items
const storedData = window.localStorage.state
  ? JSON.parse(localStorage.getItem("state"))
  : {};

const initialState = {
  listItems: storedData ? storedData.cart.listItems : [],
  totalQuantity: storedData ? storedData.cart.totalQuantity : 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    //add item to the cart or add quantity of an item already in the cart
    addItem: (state, { payload }) => {
      let itemFound = false;

      if (payload.quantity > 0) {
        state.totalQuantity += payload.quantity;

        for (let i = 0; i < state.listItems.length; i++) {
          if (state.listItems[i].name === payload.name) {
            state.listItems[i].quantity += payload.quantity;
            itemFound = true;
          }
        }
        if (!itemFound) {
          state.listItems.push({
            name: payload.name,
            quantity: payload.quantity,
            price: payload.price,
            id: payload.id,
            img: payload.img,
          });
        }
      }
    },

    //remove an item from the cart
    removeItem: (state, { payload }) => {
      if (state.listItems.length > 0) {
        let newArray = [];

        for (let i = 0; i < state.listItems.length; i++) {
          if (state.listItems[i].name !== payload)
            newArray.push(state.listItems[i]);
          else state.totalQuantity -= state.listItems[i].quantity;
        }
        state.listItems = [...newArray];
      }
    },

    //adding quantity to an item from the cart
    addQuantity: (state, { payload }) => {
      for (let i = 0; i < state.listItems.length; i++) {
        if (state.listItems[i].name === payload) {
          state.listItems[i].quantity += 1;
          state.totalQuantity += 1;
        }
      }
    },

    //removing quantity to an item from the cart
    removeQuantity: (state, { payload }) => {
      for (let i = 0; i < state.listItems.length; i++) {
        if (state.listItems[i].name === payload) {
          if (state.listItems[i].quantity > 1) state.listItems[i].quantity -= 1;
          state.totalQuantity -= 1;
        }
      }
    },

    deleteCart: (state) => {
      state.listItems = [];
      state.totalQuantity = 0;
    },
  },
});

export const { addItem, removeItem, addQuantity, removeQuantity, deleteCart } =
  cartSlice.actions;
export default cartSlice.reducer;
