import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getFeaturedProducts, searchProductsService} from "../../../services/getProducts";

const initialState = {
  loading: false,
  error: null,
  response: null,
};
const searchProductsSlice = createSlice({
  name: "featuredProducts",
  initialState,
  reducers: {
    defaultState: (state, action) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(searchProductAction.pending, (state) => {
      {
        state.loading = true;
      }
    });
    builder.addCase(searchProductAction.fulfilled, (state, action) => {
      state.response = action.payload;
      state.loading = false;
    });
    builder.addCase(searchProductAction.rejected, (state, action) => {
      {
        state.error = action.payload;
        state.loading = false;
      }
    });
  },
});
export const searchProductAction = createAsyncThunk("getFeaturedProducts", async ({data}, thunkApi) => {
  return searchProductsService({queries: data})
    .then((response) => {
      if (response.status === true) {
        return response?.data?.products;
      }
    })

    .catch((error) => {
      // thunkApi.dispatch(changeLoading(false));
      return thunkApi.rejectWithValue(error.message);
    });
});

export default searchProductsSlice.reducer;
export const {defaultState} = searchProductsSlice.actions;
