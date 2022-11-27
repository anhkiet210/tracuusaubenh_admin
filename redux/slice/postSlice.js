import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    allPostPending: [],
    postDetail: null,
  },
  reducers: {
    setAllPostPending: (state, action) => {
      state.allPostPending = action.payload;
    },
    setPostDetail: (state, action) => {
      state.postDetail = action.payload;
    },
    removePostPending: (state, action) => {
      state.allPostPending = state.allPostPending.filter(
        (item) => item._id !== action.payload
      );
    },
  },
});

const { reducer, actions } = postSlice;

export const { setAllPostPending, setPostDetail, removePostPending } = actions;

export default reducer;
