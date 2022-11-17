import { createSlice } from "@reduxjs/toolkit";

const cropSlice = createSlice({
  name: "crop",
  initialState: {
    allCrops: [],
  },
  reducers: {
    setAllCrops: (state, action) => {
      state.allCrops = action.payload;
    },
  },
});

const { reducer, actions } = cropSlice;

export const { setAllCrops } = actions;

export default reducer;
