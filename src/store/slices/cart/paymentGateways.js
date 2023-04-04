import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getPaymentGateways} from "../../../services/general";
import {getFeaturedCategories} from "../../../services/getProducts";

const initialState = {
  loading: false,
  error: null,
  response: null,
};
const paymentGatewaySlice = createSlice({
  name: "getPaymentGateway",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPaymentGatewayAction.pending, (state) => {
      {
        state.loading = true;
      }
    });
    builder.addCase(getPaymentGatewayAction.fulfilled, (state, action) => {
      state.response = action.payload.map((item) => ({payment_method: item?.id, payment_method_title: item?.title}));
      state.loading = false;
    });
    builder.addCase(getPaymentGatewayAction.rejected, (state, action) => {
      {
        state.error = action.payload;
        state.loading = false;
      }
    });
  },
});
export const getPaymentGatewayAction = createAsyncThunk("getPaymentGateway", async ({data}, thunkApi) => {
  return getPaymentGateways()
    .then((response) => {
      return response;
    })

    .catch((error) => {
      // thunkApi.dispatch(changeLoading(false));
      return thunkApi.rejectWithValue(error.message);
    });
});

export default paymentGatewaySlice.reducer;
