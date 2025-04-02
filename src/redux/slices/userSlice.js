import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
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
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // },
  },
});

export const { addUserInfo } = userSlice.actions;
export default userSlice.reducer;
