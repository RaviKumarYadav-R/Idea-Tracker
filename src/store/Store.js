import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import ideasReducer from "./ideasSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    ideas: ideasReducer,
  },
});

export default store;
