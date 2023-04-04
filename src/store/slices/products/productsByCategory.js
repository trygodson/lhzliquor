import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getFeaturedProducts} from "../../../services/getProducts";

const initialState = {
  loading: false,
  listEnd: false,
  error: null,
  response: [],
};
const getProductsByCategorySlice = createSlice({
  name: "featuredProducts",
  initialState,
  reducers: {
    productByCategoryDefaultState: (state, action) => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getProductsByCategoryandOthersAction.pending, (state) => {
      {
        state.loading = true;
      }
    });
    builder.addCase(getProductsByCategoryandOthersAction.fulfilled, (state, action) => {
      if (action.payload?.length > 0) {
        state.response = [...state.response, ...action.payload];
        state.loading = false;
      } else {
        state.listEnd = true;
        state.loading = false;
      }
    });
    builder.addCase(getProductsByCategoryandOthersAction.rejected, (state, action) => {
      {
        state.error = action.payload;
        state.loading = false;
      }
    });
  },
});
export const getProductsByCategoryandOthersAction = createAsyncThunk(
  "getFeaturedProducts",
  async ({data}, thunkApi) => {
    return getFeaturedProducts({queries: data})
      .then((response) => {
        console.log(response, "---from category and other action slice-----");
        if (response.status === true) {
          return response?.data?.products;
        }
      })

      .catch((error) => {
        // thunkApi.dispatch(changeLoading(false));
        return thunkApi.rejectWithValue(error.message);
      });
  }
);

export default getProductsByCategorySlice.reducer;
export const {productByCategoryDefaultState} = getProductsByCategorySlice.actions;
