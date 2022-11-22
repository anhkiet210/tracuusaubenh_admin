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
    addPest: (state, action) => {
      state.allPests = [...state.allPests, action.payload];
    },
  },
});

const { reducer, actions } = pestSlice;

export const { setAllPests, addPest } = actions;
export default reducer;
