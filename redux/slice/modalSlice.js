import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    show: false,
    showModalPostDetail: false,
  },
  reducers: {
    setShow: (state, action) => {
      state.show = action.payload;
    },
    setShowModalPostDetail: (state, action) => {
      state.showModalPostDetail = action.payload;
    },
  },
});

const { reducer, actions } = modalSlice;
export const { setShow, setShowModalPostDetail } = actions;
export default reducer;
