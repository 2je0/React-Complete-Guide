import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {
  items: [
    {
      title: "Test",
      price: 6,
      amount: 1,
    },
  ],
  menu: [
    {
      title: "Test",
      price: 6,
      description: "This is a first product - amazing!",
    },
    {
      title: "Pasta",
      price: 10,
      description: "This is a first product - amazing!",
    },
  ],
  showCart: true,
};
const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    toggleHandler(state) {
      state.showCart = !state.showCart;
    },
    addCartHandler(state, action) {
      let isintheCart = false;
      state.items.map((ele) => {
        if (ele.title === action.payload.title) {
          ele.amount = ele.amount + 1;
          isintheCart = true;
        }
        if (!isintheCart) {
          state.items.push({ ...action.payload, amount: 1 });
        }
      });
    },
    onCartPlusHandler(state, action) {
      state.items.map((ele) => {
        if (ele.title === action.payload.title) {
          ele.amount = ele.amount + 1;
        }
      });
    },
    onCartMinusHandler(state, action) {
      state.items.map((ele) => {
        if (ele.title === action.payload.title) {
          if (ele.amount > 0) ele.amount = ele.amount - 1;
        }
      });
    },
  },
});
export const cartActions = cartSlice.actions;
export default cartSlice.reducer;
