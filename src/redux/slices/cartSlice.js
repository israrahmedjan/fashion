import Wishlist from "@/app/_components/produccts/Wishlist";
import { createSlice } from "@reduxjs/toolkit";
//const isUserLogin = JSON.parse(localStorage.getItem("isUserLogin"));
const initialState = {
  value: 0,
  cartItems : []
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
      addcartItems: (state,action) => {
        const newItem = action.payload;
        const isExist = state.cartItems.some(item => item.productId === newItem.productId);
      
        if (!isExist) {
          state.cartItems = [...state.cartItems, newItem];
        }
      //  state.value += 1;
      },
      removecartItemslice: (state, action) => {
        const productIdToRemove = action.payload;
        state.cartItems = state.cartItems.filter(
          item => item.productId !== productIdToRemove
        );
      },
      loadOldData: (state,action) => {
       // state.LoginModelBox = action.payload;
       console.log("Load Old Data!");
      //  state.value += 1;
      },
      },
});

export const { addcartItems,loadOldData,removecartItemslice } = cartSlice.actions;
export default cartSlice.reducer;
