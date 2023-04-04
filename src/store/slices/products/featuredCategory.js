import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getFeaturedCategories} from "../../../services/getProducts";
import {shuffle} from "../../../utils/others";

const initialState = {
  loading: false,
  error: null,
  home: [],
  shop: [],
};
const getFeaturesCategorySlice = createSlice({
  name: "getFeatureCategorySlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFeaturedCategoryAction.pending, (state) => {
      {
        state.loading = true;
      }
    });
    builder.addCase(getFeaturedCategoryAction.fulfilled, (state, action) => {
      state.home = shuffle(action.payload).slice(0, 5);
      state.shop = action.payload;
      state.loading = false;
    });
    builder.addCase(getFeaturedCategoryAction.rejected, (state, action) => {
      {
        state.error = action.payload;
        state.loading = false;
      }
    });
  },
});
export const getFeaturedCategoryAction = createAsyncThunk("getFeatureCategory", async ({data}, thunkApi) => {
  return getFeaturedCategories()
    .then((response) => {
      if (response?.status === true) {
        return response?.data?.categories;
      } else {
        return thunkApi.rejectWithValue(JSON.stringify(error.message));
      }
    })

    .catch((error) => {
      // thunkApi.dispatch(changeLoading(false));
      return thunkApi.rejectWithValue(error.message);
    });
});

export default getFeaturesCategorySlice.reducer;
