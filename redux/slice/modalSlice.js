import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    show: false,
    showModalPostDetail: false,
    showModalInputNote: false,
  },
  reducers: {
    setShow: (state, action) => {
      state.show = action.payload;
    },
    setShowModalPostDetail: (state, action) => {
      state.showModalPostDetail = action.payload;
    },
    setShowModalInputNote: (state, action) => {
      state.showModalInputNote = action.payload;
    },
  },
});

const { reducer, actions } = modalSlice;
export const { setShow, setShowModalPostDetail, setShowModalInputNote } =
  actions;
export default reducer;
