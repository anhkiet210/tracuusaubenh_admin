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
  },
});

const { reducer, actions } = authSlice;

export const { setInfoCurrentUser, setInfoAllUsers } = actions;
export default reducer;
