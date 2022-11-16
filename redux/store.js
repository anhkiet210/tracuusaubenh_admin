import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import pestSlice from "./slice/pestSlice";

const rootReducer = {
  auth: authSlice,
  pest: pestSlice,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
