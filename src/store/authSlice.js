import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userLoginStatus: false,
    userDetails: null,
  },
  reducers: {
    login: (state, action) => {
      state.userLoginStatus = true;
      state.userDetails = action.payload;
    },
    logout: (state) => {
      state.userLoginStatus = false;
      state.userDetails = null;
    },
  },
});
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;