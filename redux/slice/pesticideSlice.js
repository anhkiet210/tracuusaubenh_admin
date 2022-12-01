import { createSlice } from "@reduxjs/toolkit";

const pesticideSlice = createSlice({
  name: "pesticide",
  initialState: {
    allPesticides: [],
  },
  reducers: {
    setAllPesticide: (state, action) => {
      state.allPesticide = action.payload;
    },
  },
});

const { reducer, actions } = pesticideSlice;

export const { setAllPesticide } = actions;
export default reducer;
