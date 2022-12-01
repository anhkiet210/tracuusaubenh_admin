import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice";
import pestSlice from "./slice/pestSlice";
import cropSlice from "./slice/cropSlice";
import loadingSlice from "./slice/loadingSlice";
import postSlice from "./slice/postSlice";
import modalSlice from "./slice/modalSlice";
import pesticideSlice from "./slice/pesticideSlice";

const rootReducer = {
  auth: authSlice,
  pest: pestSlice,
  crop: cropSlice,
  loading: loadingSlice,
  post: postSlice,
  modal: modalSlice,
  pesticide: pesticideSlice,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
