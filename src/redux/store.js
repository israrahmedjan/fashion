import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice";
import counterSlice from "./slices/userSlice"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user:counterSlice,

  },
});
