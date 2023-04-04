import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getFeaturedProducts} from "../../../services/getProducts";

const initialState = {
  loading: false,
  error: null,
  response: [],
};
const getFeaturesTabProductsSlice = createSlice({
  name: "featuredProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFeaturedProductTabAction.pending, (state) => {
      {
        state.loading = true;
      }
    });
    builder.addCase(getFeaturedProductTabAction.fulfilled, (state, action) => {
      state.response = action.payload;
      state.loading = false;
    });
    builder.addCase(getFeaturedProductTabAction.rejected, (state, action) => {
      {
        state.error = action.payload;
        state.loading = false;
      }
    });
  },
});
export const getFeaturedProductTabAction = createAsyncThunk("getFeaturedTabProducts", async ({data}, thunkApi) => {
  return getFeaturedProducts({queries: data})
    .then((response) => {
      if (response?.status === true) {
        return response?.data?.products;
      }
    })

    .catch((error) => {
      // thunkApi.dispatch(changeLoading(false));
      return thunkApi.rejectWithValue(error.message);
    });
});

export default getFeaturesTabProductsSlice.reducer;
