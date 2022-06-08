import { createSlice } from "@reduxjs/toolkit";

const authinitialState = { auth: false };
const authSlice = createSlice({
  name: "auth",
  initialState: authinitialState,
  reducers: {
    login(state) {
      console.log("login");
      state.auth = true;
    },
    logout(state) {
      state.auth = false;
    },
  },
});
export const authAction = authSlice.actions;
export default authSlice.reducer;
