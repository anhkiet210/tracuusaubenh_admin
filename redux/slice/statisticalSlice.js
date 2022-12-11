import { createSlice } from "@reduxjs/toolkit";

const statisticalSlice = createSlice({
  name: "statistical",
  initialState: {
    allStatistical: [],
  },
  reducers: {
    setAllStatistical: (state, action) => {
      state.allStatistical = action.payload;
    },
  },
});

const { reducer, actions } = statisticalSlice;

export const { setAllStatistical } = actions;

export default reducer;
