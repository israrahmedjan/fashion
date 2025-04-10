import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import counterSlice from "./slices/userSlice"
import cartSlice from "./slices/cartSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user:counterSlice,
    cart:cartSlice,
  },
});
