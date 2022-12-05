import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: {},
    allUsers: [],
  },
  reducers: {
    setInfoCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setInfoAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
    deleteUserRedux: (state, action) => {
      state.allUsers = state.allUsers.filter(
        (item) => item._id !== action.payload
      );
    },
  },
});

const { reducer, actions } = authSlice;

export const { setInfoCurrentUser, setInfoAllUsers, deleteUserRedux } = actions;
export default reducer;
