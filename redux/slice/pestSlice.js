import { createSlice } from "@reduxjs/toolkit";

const pestSlice = createSlice({
  name: "pest",
  initialState: {
    allPests: [],
  },
  reducers: {
    setAllPests: (state, action) => {
      state.allPests = action.payload;
    },
  },
});

const { reducer, actions } = pestSlice;

export const { setAllPests } = actions;
export default reducer;
