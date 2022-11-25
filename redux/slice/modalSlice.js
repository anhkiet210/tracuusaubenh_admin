import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    show: false,
  },
  reducers: {
    setShow: (state, action) => {
      state.show = action.payload;
    },
  },
});

const { reducer, actions } = modalSlice;
export const { setShow } = actions;
export default reducer;
