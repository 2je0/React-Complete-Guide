import { createSlice } from "@reduxjs/toolkit";

const counterinitialState = { counter: 0, toggle: true };
const counterSlice = createSlice({
  name: "counter",
  initialState: counterinitialState,
  reducers: {
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
    increase(state, action) {
      state.counter = state.counter + action.payload;
    },
    toggleCounter(state) {
      state.toggle = !state.toggle;
    },
  },
});
export const counterAction = counterSlice.actions;
export default counterSlice.reducer;
