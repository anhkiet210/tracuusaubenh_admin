import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import pestSlice from "./slice/pestSlice";
import cropSlice from "./slice/cropSlice";

const rootReducer = {
  auth: authSlice,
  pest: pestSlice,
  crop: cropSlice,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
