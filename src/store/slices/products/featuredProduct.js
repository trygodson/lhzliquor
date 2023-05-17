import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getFeaturedProducts} from "../../../services/getProducts";
import {shuffle} from "../../../utils/others";

const initialState = {
  loading: false,
  error: null,
  response: [],
};
const getFeaturesSliderProductsSlice = createSlice({
  name: "featuredProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFeaturedProductSliderAction.pending, (state) => {
      {
        state.loading = true;
      }
    });
    builder.addCase(getFeaturedProductSliderAction.fulfilled, (state, action) => {
      state.response = shuffle(action.payload).slice(0, 3);
      state.loading = false;
    });
    builder.addCase(getFeaturedProductSliderAction.rejected, (state, action) => {
      {
        state.error = action.payload;
        state.loading = false;
      }
    });
  },
});
export const getFeaturedProductSliderAction = createAsyncThunk("getFeaturedProducts", async ({data}, thunkApi) => {
  return getFeaturedProducts({queries: data})
    .then((response) => {
      console.log(response, "----featured products-----");

      if (response?.status === true) {
        return response?.data?.products;
      }
    })

    .catch((error) => {
      // thunkApi.dispatch(changeLoading(false));
      return thunkApi.rejectWithValue(error.message);
    });
});

export default getFeaturesSliderProductsSlice.reducer;
