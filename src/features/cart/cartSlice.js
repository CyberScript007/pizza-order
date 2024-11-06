import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartReducer = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter((item) => action.payload !== item.pizzaId);
    },
    increaseItemQuantity(state, action) {
      const cartItem = state.cart.find(
        (item) => item.pizzaId === action.payload,
      );
      cartItem.quantity++;
      cartItem.totalPrice = cartItem.quantity * cartItem.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      const cartItem = state.cart.find(
        (item) => item.pizzaId === action.payload,
      );
      cartItem.quantity--;
      cartItem.totalPrice = cartItem.quantity * cartItem.unitPrice;

      if (cartItem.quantity === 0)
        cartReducer.caseReducers.deleteItem(state, action);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export default cartReducer.reducer;

export const {
  addToCart,
  deleteItem,
  clearCart,
  increaseItemQuantity,
  decreaseItemQuantity,
} = cartReducer.actions;

export const getCart = (state) => state.cart.cart;

export const getTotalPriceItem = (state) =>
  state.cart.cart.reduce((acc, item) => acc + item.totalPrice, 0);

export const getTotalQuantityItem = (state) =>
  state.cart.cart.reduce((acc, item) => acc + item.quantity, 0);

export const getCurrentQuantityItem = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;
