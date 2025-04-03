import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
  isUserLogin:false,
  LoginModelBox:false,
  user : {}
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
        state.isUserLogin = action.payload;
      //  state.value += 1;
      },
      LoginModelBoxAction: (state,action) => {
        state.LoginModelBox = action.payload;
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

export const { addUserInfo,loginAction,LoginModelBoxAction } = userSlice.actions;
export default userSlice.reducer;
