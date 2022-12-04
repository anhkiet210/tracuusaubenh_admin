import { createSlice } from "@reduxjs/toolkit";

const pesticideSlice = createSlice({
  name: "pesticide",
  initialState: {
    allPesticides: [],
  },
  reducers: {
    setAllPesticide: (state, action) => {
      state.allPesticides = action.payload;
    },
    addPesticide: (state, action) => {
      state.allPesticides = [...state.allPesticides, action.payload];
    },
  },
});

const { reducer, actions } = pesticideSlice;

export const { setAllPesticide, addPesticide } = actions;
export default reducer;
