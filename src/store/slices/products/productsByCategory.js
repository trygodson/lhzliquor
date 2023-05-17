import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getFeaturedProducts} from "../../../services/getProducts";

const initialState = {
  loading: false,
  listEnd: false,
  error: null,
  response: [],
};
const getProductsByCategorySlice = createSlice({
  name: "productsByCategorySlice",
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
      if (action.payload.cat === true) {
        if (action.payload?.products.length > 0) {
          state.response = [...action.payload.products];
        } else {
          state.response = [];
        }
      } else {
        if (action.payload?.products.length > 0) {
          state.response = [...state.response, ...action.payload];
          state.loading = false;
        } else {
          state.listEnd = true;
          state.loading = false;
        }
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
  "productsByCategory",
  async ({data, cat}, thunkApi) => {
    return getFeaturedProducts({queries: data})
      .then((response) => {
        console.log(response, "---from category and other action slice-----");
        if (response.status === true) {
          if (cat) {
            return {
              products: response?.data?.products,
              cat: true,
            };
          } else {
            return {
              products: response?.data?.products,
              cat: true,
            };
          }
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
