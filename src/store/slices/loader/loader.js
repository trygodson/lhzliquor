import {createSlice} from "@reduxjs/toolkit";
var initialState = {
  loading: false,
};
const LoaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    changeLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export default LoaderSlice.reducer;
export const {changeLoading} = LoaderSlice.actions;
