import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: null,
    allUsers: [],
    tokenRedux: null,
  },
  reducers: {
    setInfoCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setInfoAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
    setTokenRedux: (state, action) => {
      state.tokenRedux = action.payload;
    },
    deleteUserRedux: (state, action) => {
      state.allUsers = state.allUsers.filter(
        (item) => item._id !== action.payload
      );
    },
  },
});

const { reducer, actions } = authSlice;

export const {
  setInfoCurrentUser,
  setInfoAllUsers,
  deleteUserRedux,
  setTokenRedux,
} = actions;
export default reducer;
