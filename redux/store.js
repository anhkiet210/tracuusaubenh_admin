import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import pestSlice from "./slice/pestSlice";
import cropSlice from "./slice/cropSlice";
import loadingSlice from "./slice/loadingSlice";

const rootReducer = {
  auth: authSlice,
  pest: pestSlice,
  crop: cropSlice,
  loading: loadingSlice,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
