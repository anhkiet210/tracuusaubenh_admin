import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
  name: "loading",
  initialState: {
    loading: false,
    loadingDeny: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setLoadingDeny: (state, action) => {
      state.loadingDeny = action.payload;
    },
  },
});

const { reducer, actions } = loadingSlice;

export const { setLoading, setLoadingDeny } = actions;
export default reducer;
