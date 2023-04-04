import {StackActions} from "@react-navigation/native";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getCartcount} from "../../../services/cart";

const initialState = {
  loading: false,
  error: null,
  response: null,
};
const cartCountSlice = createSlice({
  name: "cartcountslice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(cartCountAction.pending, (state) => {
      {
        state.loading = true;
      }
    });
    builder.addCase(cartCountAction.fulfilled, (state, action) => {
      state.response = action.payload;
      state.loading = false;
    });
    builder.addCase(cartCountAction.rejected, (state, action) => {
      {
        state.error = action.payload;
        state.loading = false;
      }
    });
  },
});
export const cartCountAction = createAsyncThunk("cartcountaction", async (data, thunkApi) => {
  return getCartcount()
    .then((response) => {
      if (response.status === true) {
        return response?.cart_count;
      }
    })

    .catch((error) => {
      // thunkApi.dispatch(changeLoading(false));
      console.log(error, "----error from cart count----");
      return thunkApi.rejectWithValue(error.message);
    });
});

export default cartCountSlice.reducer;
