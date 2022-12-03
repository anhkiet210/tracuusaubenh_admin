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
    deletePostPending: (state, action) => {
      state.allPostPending = state.allPostPending.filter(
        (item) => item.post._id !== action.payload
      );
    },
  },
});

const { reducer, actions } = postSlice;

export const {
  setAllPostPending,
  setPostDetail,
  deletePostPending,
} = actions;

export default reducer;
