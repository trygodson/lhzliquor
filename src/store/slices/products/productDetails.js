import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getProductsDetails} from "../../../services/getProducts";

const initialState = {
  loading: false,
  error: null,
  response: null,
};
const getProductDetailsSlice = createSlice({
  name: "productDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProductDetailsAction.pending, (state) => {
      {
        state.loading = true;
      }
    });
    builder.addCase(getProductDetailsAction.fulfilled, (state, action) => {
      state.response = action.payload;
      state.loading = false;
    });
    builder.addCase(getProductDetailsAction.rejected, (state, action) => {
      {
        state.error = action.payload;
        state.loading = false;
      }
    });
  },
});
export const getProductDetailsAction = createAsyncThunk("getProductsDetailsAction", async ({data}, thunkApi) => {
  return getProductsDetails({queries: data})
    .then((response) => {
      if (response?.status === true) {
        return response.data;
      }
    })

    .catch((error) => {
      // thunkApi.dispatch(changeLoading(false));
      return thunkApi.rejectWithValue(error.message);
    });
});

export default getProductDetailsSlice.reducer;
