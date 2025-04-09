import Wishlist from "@/app/_components/produccts/Wishlist";
import { createSlice } from "@reduxjs/toolkit";
//const isUserLogin = JSON.parse(localStorage.getItem("isUserLogin"));
const initialState = {
  value: 0,
  isUserLogin : false,
  LoginModelBox : false,
  user : {}, //localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):{},
  wishlistItems : []
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUserInfo: (state,action) => {
      state.user = action.payload;
      
    //  state.value += 1;
    },
    loginAction: (state,action) => {
      console.log("Action is called",action.payload);
        state.isUserLogin = action.payload;
        
      //  state.value += 1;
      },
      LoginModelBoxAction: (state,action) => {
        state.LoginModelBox = action.payload;
      //  state.value += 1;
      },
 
      addWishListItems: (state,action) => {
        const newItem = action.payload;
        const isExist = state.wishlistItems.some(item => item.productId === newItem.productId);
      
        if (!isExist) {
          state.wishlistItems = [...state.wishlistItems, newItem];
        }
      //  state.value += 1;
      },
      removeWishListItemSlice: (state, action) => {
        const productIdToRemove = action.payload;
        state.wishlistItems = state.wishlistItems.filter(
          item => item.productId !== productIdToRemove
        );
      },
      loadOldData: (state,action) => {
       // state.LoginModelBox = action.payload;
       console.log("Load Old Data!");
      //  state.value += 1;
      },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // },
  },
});

export const { addUserInfo,loginAction,LoginModelBoxAction,addWishListItems,loadOldData,removeWishListItemSlice } = userSlice.actions;
export default userSlice.reducer;
