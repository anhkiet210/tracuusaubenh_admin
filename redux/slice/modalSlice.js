import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    show: false,
    showModalPostDetail: false,
    showModalInputNote: false,
    showFormChangeAvatar: false,
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
    setShowFormChangeAvatar: (state, action) => {
      state.showFormChangeAvatar = action.payload;
    },
  },
});

const { reducer, actions } = modalSlice;
export const {
  setShow,
  setShowModalPostDetail,
  setShowModalInputNote,
  setShowFormChangeAvatar,
} = actions;
export default reducer;
